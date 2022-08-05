const tokens = require("../helper/token");
const response = require("../helper/response");
const ERROR = require("../helper/errorMessage");
const log = require("../helper/logger");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  } else {
    const authHeader = req.headers.authorization;
    console.log("authHeader", req.headers.authorization);
    if (authHeader && req.headers.authorization.includes("JWT ")) {
      const token = authHeader.split("JWT ")[1];
      tokens
        .decrypt(req, token)
        .then((resData) => {
          next();
        })
        .catch((error) => {
          response.errorMsgResponse(res, 401, error);
        });
    } else {
      response.errorMsgResponse(res, 401, ERROR.UNAUTHORIZED);
    }
  }
};
