const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const addCart = mongoose.model("addCart");
const UserAddresses = mongoose.model("UserAddresses");
let auth = require("../../helper/auth");

router.post("/addcart", auth, (req, res) => {
  log.debug("/api/");
  req.body["userId"] = req.userId;
  var temp;

  if (req.body.type == "Package") {
    temp = {
      type: req.body.type,
      packageId: req.body.packageId,
      userId: req.userId,
      status: "active",
    };
}else if (req.body.type == "Product") {
        temp = {
          type: req.body.type,
          productId: req.body.productId,
          userId: req.userId,
          status: "active",
        };
      }
    addCart
    .findOne(temp)
    .then((resData) => {
      if (resData) {
        console.log(
          "🚀 ~ file: addCart.js ~ line 22 ~ .then ~ resData",
          resData
        );
        commonController
          .updateBy(addCart, resData._id, {
            $inc: {
              quantity: req.body.quantity ? req.body.quantity : 1,
              ammount: req.body.ammount,
            },
            // $inc: {  },
          })
          .then((resData) => {
            response.successResponse(res, 200, resData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      } else {
        commonController
          .add(addCart, req.body)
          .then((userData) => {
            response.successResponse(res, 200, userData);
          })
          .catch((error) => {
            log.error(error);
            response.errorResponse(res, 500);
          });
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


  router.get("/addcart/getall", (req, res) => {
    log.debug("/api/addcart/list");
    commonController
      .getAll(addCart)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/userAddresses/:userId", (req, res) => {
    log.debug("/api/");
    commonController
      .getBy(UserAddresses, { userId: req.params.userId })
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  
  router.post("/add/userAddress", auth, (req, res) => {
    log.debug("/api/");
    req.body["userId"] = req.userId;
    commonController
      .add(UserAddresses, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  

  router.get("/userId/:userId", auth, (req, res) => {
    log.debug("/api/product/userid");
    commonController
      .getWithSortByPopulate(addCart, { userId: req.userId }, "productId")
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/addcart/update/:id", (req, res) => {
    log.debug("/api/addcart/update:id");
    commonController
      .updateBy(addCart, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  
  router.delete("/addcart/delete/:id", (req, res) => {
    log.debug("/api/addcart/delete");
    commonController
      .deletePerm(addCart, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
module.exports = router;
