const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const emplyoeeList = mongoose.model("emplyoeeList");

router.post("/add", (req, res) => {
 
  log.debug("/api/emplyoeeList");
  commonController
    .add(emplyoeeList, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getall", (req, res) => {
  log.debug("/api/emplyoeeList");
  commonController
    .getAll(emplyoeeList)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/list/:id", (req, res) => {
  log.debug("/api/emplyoeeList/List");
  commonController
    .getOne(emplyoeeList, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", (req, res) => {
  log.debug("/api/emplyoeeList/update");
  commonController
    .updateBy(emplyoeeList, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", (req, res) => {
  log.debug("/api/emplyoeeList/delete");
  commonController
    .delete(emplyoeeList, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
