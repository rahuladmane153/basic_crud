 
const mongoose = require("mongoose");
const connection = require("../helper/database");
const log = require("../helper/logger");
const ERRORS = require("../helper/errorMessage");

const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      log.debug("register");
      User.findOne({
          $or: [{
            email: data.email
          }, {
            mobileNumber: data.mobileNumber
          }],
        })
        .then((resUser) => {
          console.log("resUser", resUser);
          if (resUser) {
            reject(ERRORS.USER_ALREADY_REGISTERED);
          } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(data.password, salt, function (err, hash) {
                data["password"] = hash;
                const user = new User(data);
                user
                  .save()
                  .then((resData) => {
                    resolve(resData);
                  })
                  .catch((error) => {
                    log.error(error);
                    reject(ERRORS.SOMETHING_WENT_WRONG);
                  });
              });
            });
          }
        })
        .catch((error) => {
          log.error(error);
          reject(ERRORS.SOMETHING_WENT_WRONG);
        });
    });
  },

  loginWithSocial: (data) => {
    return new Promise((resolve, reject) => {
      const object = {};
      if (data.hasOwnProperty("email")) {
        object["email"] = data.email;
      }
      User.findOne({
        ...object,
        status: {
          $ne: "deleted"
        }
      }).then(
        (resUser) => {
          if (resUser) {
            resolve(resUser);
          } else {
            const obj = {
              email: data && data.email ? data.email : null,
              firstName: data.firstName,
              lastName: data.lastName,
              designation: "Student",
              loginType: data.loginType,
              isEmailVerified: data && data.email ? "Verified" : "Not",
            };
            const user = new User(obj);
            user
              .save()
              .then((resData) => {
                resolve(resData);
              })
              .catch((error) => {
                console.log("error", error);

                reject(error);
              });
          }
        }
      );
    });
  },

  login: (user) => {
    return new Promise((resolve, reject) => {
      log.info("user", user);
      const object = {};
      if (user.hasOwnProperty("email")) {
        object["email"] = user.email;
      } else {
        object["mobileNumber"] = user.mobileNumber;
      }
      User.findOne({
          ...object, //Spread Oparetor
          status: {
            $ne: "deleted"
          },
        })
        .then((resData) => {
          if (!resData) {
            reject("Please Enter Correct Credentials"); //Email not found
          } else {
            if (resData.isMobileVerified !== "Verified") {
              reject(ERRORS.MOBILE_NOT_VERIFIED);
            } else {
              bcrypt.compare(user.password, resData.password, function (
                err,
                result
              ) {
                if (result) {
                  User.findByIdAndUpdate({
                      _id: resData._id
                    }, {
                      isOnline: true
                    }, {
                      $new: true
                    })
                    .then((response) => {
                      delete resData.password;
                      delete resData.location;
                      resolve(resData);
                    })
                    .catch((error) => {
                      console.log("+++++++++++");
                      reject({
                        code: 401
                      }); //Wrong password
                    });
                } else {
                  console.log(">>>>>>>>>>>>>>");
                  reject("Please Enter Correct Credentials"); //wrong Password
                }
              });
            }
          }
        })
        .catch((error) => {
          log.error(error);
          reject(error);
        });
    });
  },

  verifyEmail: (email) => {
    return new Promise((resolve, reject) => {
      log.info("user", email);
      // User.findOne({
      //   encryptedEmail: email,
      // })
      User.findOneAndUpdate({
          encryptedEmail: email,
        }, {
          isEmailVerified: "Verified",
          encryptedEmail: null,
        }, {
          new: true
        })
        .then((resData) => {
          if (resData) {
            log.info("resData", resData);
          } else {
            reject(ERRORS.EMAIL_NOT_FOUND);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  verifyMobile: (mobile, otp) => {
    return new Promise((resolve, reject) => {
      log.info("user", mobile, otp);
      User.findOneAndUpdate({
          mobileNumber: mobile,
          otp: otp,
        }, {
          isMobileVerified: "Verified",
          otp: null,
        }, {
          new: true
        })
        .then((resData) => {
          if (resData) {
            resolve(resData);
          } else {
            reject(ERRORS.WRONG_OTP);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};