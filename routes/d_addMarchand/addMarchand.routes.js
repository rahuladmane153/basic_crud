const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const addMarchand = mongoose.model("addMarchand");

router.post("/add", (req, res) => {
 
  log.debug("/api/addMarchand");
  commonController
    .add(addMarchand, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getall", (req, res) => {
  log.debug("/api/addMarchand");
  commonController
    .getAll(addMarchand)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/list/:id", (req, res) => {
  log.debug("/api/addMarchand/List");
  commonController
    .getOne(addMarchand, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", (req, res) => {
  log.debug("/api/addMarchand/update");
  commonController
    .updateBy(addMarchand, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", (req, res) => {
  log.debug("/api/addMarchand/delete");
  commonController
    .delete(addMarchand, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
