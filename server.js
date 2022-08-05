const express = require("express");
const database = require("./helper/database");
const config = require("./config.json");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

database.initModels();
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.json())
enableCORS(app)
enableStaticFileServer(app, config.uploadUrl, '/static');
app.use(cors())

app.use(bodyParser.json())

database.initModels()
database.connect()

global.globalString = "This can be accessed anywhere!++++++++++++++"

function enableCORS(expressInstance) {
  expressInstance.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone"
    )
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    )
    next()
  })
}

function enableStaticFileServer(expressInstance, folderName, route) {
  app.use(route, express.static(path.join(__dirname, folderName)));
}
require("./routes/index.routes")(app)

const server = app.listen(config.server.port, () => {
  console.log(`App listening on port ${config.server.port}`)
})