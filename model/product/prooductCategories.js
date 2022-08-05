const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProductCatagories = new Schema(
  {
    categoryName: String,
    description: String,
    icon: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ProductCatagories", ProductCatagories);