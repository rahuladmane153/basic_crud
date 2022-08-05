const router = require("express").Router();
const commonController = require("../../controller/commonController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const NotificationSent = mongoose.model("NotificationSent");
const auth = require("../../helper/auth");


  router.get("/getAll/NotificationSent", auth, (req, res) => {
    log.debug("/api/NotificationSent");
    commonController
      .getWithSortByPopulate(NotificationSent , "UserId")
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;