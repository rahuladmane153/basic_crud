const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProductSubCatagories = new Schema(
  {
    subCategoryName: String,
    description: String,
    icon: String,
    catagoryId: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCatagories",
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
module.exports = mongoose.model("ProductSubCatagories", ProductSubCatagories);