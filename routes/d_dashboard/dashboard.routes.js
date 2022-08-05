const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const distributorDashboard = mongoose.model("distributorDashboard");
const auth = require("../../helper/auth")

router.post("/add", auth, (req, res) => {
  log.debug("/api/distributor/Dashboard");
  req.body["userId"] = req.userId;
  commonController
    .add(distributorDashboard, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getall", (req, res) => {
  log.debug("/api/distributorDashboard");
  commonController
    .getAll(distributorDashboard)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", (req, res) => {
  log.debug("/api/distributorDashboard/update");
  commonController
    .updateBy(distributorDashboard, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", (req, res) => {
  log.debug("/api/distributorDashboard/delete");
  commonController
    .delete(distributorDashboard, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;
