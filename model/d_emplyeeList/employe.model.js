const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const emplyoeeList = new Schema(
  {
    Employee_id: String,
    employee_name: String, 
    eployee_email: String, 
    employee_number: Number, 
    employee_avatar: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("emplyoeeList", emplyoeeList);
