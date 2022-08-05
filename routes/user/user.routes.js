const router = require("express").Router();
const log = require("../../helper/logger")
const response = require("../../helper/response");
const otpHelper = require("../../helper/otp");
const encryptToken = require("../../helper/token");
const sms = require("../../helper/sms");
const mail = require("../sendmail/notify");
const authController = require("../../controller/auth");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const _ = require("lodash");
const mongoose = require("mongoose");
const user = mongoose.model("User");
const config = require("../../config.json");
const auth = require("../../helper/auth");
const md5 = require("md5");


const bcrypt = require("bcrypt");
const saltRounds = config.bcryptSaltRound;


router.post("/register", (req, res) => {
  
  if (req.body.designation !== "Admin") {
    authController
      .register(req.body)
      .then((resData) => {
        
        console.log("===>>>>>1")
        if(req.body.email !== undefined || null && req.body.mobileNumber !== undefined || null ){
        const otp = otpHelper.generateOTP();
        const encryptedEmail = md5(req.body.email);
        log.debug("otp", otp, encryptedEmail);
        resData.otp = otp;
       
        commonController
        .updateBy(user, resData._id, {
          otp: otp,
          encryptedEmail: encryptedEmail,
        })
        .then((updatedOTP) => {
          sms(req.body.mobileNumber, otp)
          .then((resOTP) => {
            console.log("resData", resData);
            response.successResponse(res, 200, resData);
            const mailConfig = {
              from: config.auth.user,Distributor,
              email: req.body.email,
              subject: "Verify your mail",
              out: "hi, <a href='" +
              config.emailVerifyURL +
              encryptedEmail +
              "'>click here</a> to verify your mail",
            };
            mail
            .sendMail(mailConfig)
            .then((resMail) => {
              log.info(resMail);
            })
            .catch((error) => {
              log.error(error);
            });
          })
          .catch((error) => {
            log.error("error", error);
            // response.errorMsgResponse(res, 404, ERRORS.SOMETHING_WENT_WRONG);
          });
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
      }else{
        response.successResponse(res, 200, resData);
      }
      
    })
    .catch((error) => {
      response.errorMsgResponse(res, 505, error);
    });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.ADMIN_CANNOT_BE_REEGISTER);
  }
});

router.post("/login", (req, res) => {
  authController
    .login(req.body)
    .then((resData) => {
      const userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken
        .encrypt(req, userValidData)
        .then((resToken) => {
          userValidData["token"] = resToken.token;
          const responseData = _.pick(userValidData, [
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
            "designation",
            "token",
          ]);
          const responseobj = {
            id: resData._id,
            email: resData.email,
            profileURL: resData.profileURL,
            designation: resData.designation,
            firstName: resData.firstName,
            lastName: resData.lastName,
            phone: resData.mobileNumber,
            address: resData.address,
            accessToken: userValidData.token,
          };
          response.successResponse(res, 200, responseobj);
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 505, error);
    });
});


router.get("/resend/otp/:mobile", (req, res) => {
  log.debug("/resend/otp/:mobile", req.params.mobile);
  if (req.params.mobile) {
    commonController
      .getOne(user, {
        mobileNumber: req.params.mobile
      })
      .then((resData) => {
        if (resData) {
          const otp = otpHelper.generateOTP();
          commonController
            .updateBy(user, resData._id, {
              otp: otp
            })
            .then((updatedOTP) => {
              sms(req.params.mobile, otp)
                .then((resOTP) => {
                  console.log(otp);
                  response.successResponse(res, 200, "Successfully send otp");
                })
                .catch((error) => {
                  log.error("error", error);
                  response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
                });
            })
            .catch((error) => {
              log.error("error", error);
              response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
            });
        } else {
          response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
        }
      })
      .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
  }
});

router.get("/resend/email/:email", (req, res) => {
  log.debug("/resend/email/:email", req.params.otp);
  const encryptedEmail = md5(req.params.email);
  if (req.params.email) {
    commonController
      .updateWithObject(
        user, {
          email: req.params.email
        }, {
          encryptedEmail: encryptedEmail
        }
      )
      .then((updatedOTP) => {
        const mailConfig = {
          from: config.auth.user,
          email: req.params.email,
          subject: "Verify your mail",
          out: "hi, <a href='" +
            config.emailVerifyURL +
            encryptedEmail +
            "'>click here</a> to verify your mail",
        };
        mail
          .sendMail(mailConfig)
          .then((resMail) => {
            log.info(resMail);
            response.successResponse(res, 200, "Successfully send Email");
          })
          .catch((error) => {
            log.error(error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
          });
      })
      .catch((error) => {
        log.debug("error", error);
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
  }
});

router.get("/verify/email/:email", (req, res) => {
  log.debug("req", md5(req.params.email));
  authController
    .verifyEmail(md5(req.params.email))
    .then((resData) => {
      res.redirect(config.appURL);
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});

router.get("/verify/mobile/:mobile/:otp", (req, res) => {
  log.debug("/verify/mobile/:mobile/:otp", req.params.otp);
  if (req.params.otp) {
    authController
      .verifyMobile(req.params.mobile, req.params.otp)
      .then((resData) => {
        response.successResponse(res, 200, "Mobile Number Verified");
      })
      .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.WRONG_OTP);
  }
});

router.get("/send/otp/forgot/password/:mobileNumber", (req, res) => {
  user
    .findOne({
      mobileNumber: req.params.mobileNumber
    })
    .then((validData) => {
      if (validData) {
        const otp = otpHelper.generateOTP();
        if (req.params.mobileNumber) {
          commonController
            .updateWithObject(
              user, {
                mobileNumber: req.params.mobileNumber,
                isMobileVerified: "Verified",
              }, {
                otp: otp
              }
            )
            .then((updatedOTP) => {
              response.successResponse(res, 200, "otp sent");
              sms(req.params.mobileNumber, otp)
                .then((smsData) => {
                  console.log("smsData", smsData);
                })
                .catch((error) => {
                  log.debug("error", error);
                  response.errorMsgResponse(
                    res,
                    301,
                    ERRORS.SOMETHING_WENT_WRONG
                  );
                });
            })
            .catch((error) => {
              log.debug("error", error);
              response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
            });
        } else {
          response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
        }
      } else {
        response.errorMsgResponse(res, 301, "your mobilenumber is not found ");
      }
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});
router.post("/forget/password", (req, res) => {
  user
    .findOne({
      mobileNumber: req.body.mobileNumber
    })
    .then((validData) => {
      if (validData) {
        const obj = {};
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            //  obj["password"] = hash;
            //  console.log("obj[]", obj["password"])
            commonController
              .updateWithObject(
                user, {
                  mobileNumber: req.body.mobileNumber,
                  otp: req.body.otp
                }, {
                  password: hash,
                  otp: null
                }
              )
              .then((resData) => {
                console.log("hash", hash);
                // console.log("resData", resData.password);
                response.successResponse(
                  res,
                  200,
                  "password updated Now you can login"
                );
              })
              .catch((error) => {
                console.log("error", error);
                response.errorMsgResponse(
                  res,
                  301,
                  ERRORS.SOMETHING_WENT_WRONG
                );
              });
          });
        });
      } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
      }
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

//get by regex Name Mobile , emailId

router.get("/getByRegex", (req, res) => {
  // const object = {
  //   email: req.body.email,
  //   firstName: req.body.firstName,
  // };

  user
    .find({
      // $or: [
      //   {
      email: {
        $regex: req.body.email,
      },
      // },
      //   {
      //     firstName: {
      //       $regex: req.body.firstName,
      //     },
      //   },
      // ],
    })
    .then((resData) => {
      console.log("resData", resData);
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});



router.get("/getProfile", auth, async (req, res) => {
  try {
    const resData = await commonController.getOne(user, {
      _id: req.userId
    })
    const responseObj = {
      _id: resData._id,
      firstName: resData.firstName,
      lastName: resData.lastName,
    }
    responseObj.firstName == undefined ? responseObj.firstName = "" : responseObj.firstName
    responseObj.lastName == undefined ? responseObj.lastName = "" : responseObj.lastName
    response.successResponse(res, 200, responseObj)
  } catch (error) {
    log.error("Error :", error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
  }
})


router.put("/update/profile", auth, async (req, res) => {
  try {
    const data = await commonController.updateBy(user, req.userId, req.body)
    const resData = await commonController.getOne(user, {
      _id: req.userId
    })
    
    response.successResponse(res, 200, resData)
  } catch (error) {
    log.error("Error :", error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
  }
});



module.exports = router;