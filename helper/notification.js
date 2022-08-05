const log = require("../helper/logger");
const mongoose = require("mongoose");

module.exports = {
    notification: (data, tokenData) => {
        log.debug("notify", data);
        return new Promise(function (resolve, reject) {
            const message = {
                notification: {
                    title: data.title,
                    body: data.message
                },
            };
            const options = { priority: "high", timeToLive: 60 * 60 * 24 };
            fbadmin
                .messaging()
                .sendToDevice(tokenData, message, options)
                .then((response) => {
                    resolve(response);
                    console.log("response sucess : ", response);
                    console.log("response error : ", response.results[0].error);
                });

        });
    },

};