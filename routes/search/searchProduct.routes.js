const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Product = mongoose.model("Product");


router.post("/productname", (req, res) => { 
    log.debug("/api/search/productName");
    let productName = req.body.productName
    commonController
      .getBy(Product, {
        Product: {
          $regex: productName,
          $options: "i",
        }
      })
      .then((resData) => {
        response.successResponse(res, 200, resData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  })

  module.exports = router;