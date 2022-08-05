let router = require("express").Router();
let log = require("../helper/logger");
let config = require("../config.json");

let multer = require("multer");
let multerS3 = require("multer-s3");

let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "./public/uploads");
        },
        filename: (req, file, callback) => {
            req.originalName = Date.now() + "-" + file.originalname;
            callback(null, req.originalName);
        },
    }),
}).any(); // for multiple upload

router.post("/", (req, res) => {
    log.debug("/api/uploads");
    upload(req, res, (err) => {
        var files = [];
        req.files.forEach((ele) => {
            console.log(ele);
            files.push(config.staticFilesUrl + ele.filename);
        });
        res.send({
            status: "SUCCESS",
            files
        });
    });
});

module.exports = router