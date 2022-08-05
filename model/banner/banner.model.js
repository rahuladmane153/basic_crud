const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Banner = new Schema(
  {
    bannerName: String,
    description: String,
    icon: String,
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
module.exports = mongoose.model("Banner", Banner);