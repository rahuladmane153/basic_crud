const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const bankDetails = new Schema(
  {
    distributorId: {
        type: mongoose.Types.ObjectId,
        ref: "Distributor",
      },
    bankName: String, 
    account_type: String, 
    account_no: Number,
    branch_name: String, 
    IFSC_code: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("bankDetails", bankDetails);
