const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ProductSubCatagories = mongoose.model("ProductSubCatagories");

router.post("/add", (req, res) => {
  log.debug("/api/product/subCategory");
  commonController
    .add(ProductSubCatagories, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getall", (req, res) => {
  log.debug("/api/product/subCategory");
  commonController
    .getAll(ProductSubCatagories)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/:id", (req, res) => {
  log.debug("/api/product/subCategory/id");
  commonController
    .getOne(ProductSubCatagories, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/catagory/:catagoryId", (req, res) => {
  log.debug("/api/product/subCategory");
  commonController
    .getOne(ProductSubCatagories, { catagoryId: req.params.catagoryId })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", (req, res) => {
  log.debug("/api/product/subCategory/:id");
  commonController
    .updateBy(ProductSubCatagories, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", (req, res) => {
  log.debug("/api/product/subCategory");
  commonController
    .delete(ProductSubCatagories, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;