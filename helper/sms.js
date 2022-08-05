const http = require("http");
const config = require("../config.json");
const request = require("request");

module.exports = function (mobileNumber, otp) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url:
        "http://2factor.in//API/V1/" +
        config.smsKey +
        "/SMS/" +
        mobileNumber +
        "/" +
        otp +
        "/orbit-mart",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      form: {},
    };

    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        console.log(body);
        resolve(true);
      }
    });
  });
};