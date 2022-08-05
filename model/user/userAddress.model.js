const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserAddresses = new Schema(
  {
    title: String,
    address: String,
    landmark: String,
    state: String,
    city: String,
    pincode: Number,
    country: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("UserAddresses", UserAddresses);
