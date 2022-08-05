const mongoose = require("mongoose")
const { dbUrl, NODE_ENVIR } = require("../config.json")

module.exports = {
  connect: () => {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).then((res) => console.log("DB.Connection succesfull..!!"));
    mongoose.Promise = global.Promise;
  },
  initModels: () => require("../model/index.model")
}