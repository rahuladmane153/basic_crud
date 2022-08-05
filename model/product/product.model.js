const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Product = new Schema(
  {
    productName: String,
    catagoryId: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCatagories",
    },
    subCatagoryId: {
      type: mongoose.Types.ObjectId,
      ref: "SubCatagories",
    },
    ProductDetails: String,
    productPrice: String,
    icon: String,
    productWeight: String,
    Qty: String,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", Product);
