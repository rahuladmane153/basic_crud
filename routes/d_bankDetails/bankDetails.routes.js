const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const bankDetails = mongoose.model("bankDetails");
const auth = require("../../helper/auth")

router.post("/add", auth, (req, res) => {
  log.debug("/api/bankDetails");
  req.body["userId"]  = req.userId
  commonController
    .add(bankDetails, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

// router.get("/getall", (req, res) => {
//   log.debug("/api/bankDetails");
//   commonController
//     .getAll(bankDetails)
//     .then((userData) => {
//       response.successResponse(res, 200, userData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });

router.get("/:id", auth, (req, res) => {
  log.debug("/api/bankDetails/List");
  req.body["userId"]  = req.userId
  commonController
    .getOne(bankDetails, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/:id", (req, res) => {
  log.debug("/api/bankDetails/update");
  commonController
    .updateBy(bankDetails, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", (req, res) => {
  log.debug("/api/bankDetails/delete");
  commonController
    .delete(bankDetails, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
