const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Banner = mongoose.model("Banner");
const auth = require("../../helper/auth");

router.post("/add", auth, (req, res) => {
    log.debug("/api/banner");
    commonController
      .add(Banner, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/all", (req, res) => {
    log.debug("/api/banner");
    commonController
      .getAll(Banner)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/:id", (req, res) => {
    log.debug("/api/banner/id");
    commonController
    .getBy(Banner, { _id: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.delete("/delete/:id", auth, (req, res) => {
    log.debug("/api/banner/delete");
    commonController
      .delete(Banner, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/update/:id", auth, (req, res) => {
    log.debug("/api/banner/update");
    commonController
      .updateBy(Banner, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;