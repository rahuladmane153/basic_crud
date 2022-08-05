const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const addMarchand = new Schema(
  {
    distributorId: {
        type: mongoose.Types.ObjectId,
        ref: "Distributor",
      },
    marchand_name: String, 
    marchand_email: String, 
    marchand_number: Number, 
    marchand_avatar: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("addMarchand", addMarchand);
