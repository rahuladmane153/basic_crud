const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const addCart = new Schema(
  {
    quantity: { type: Number, default: 1 },
    ammount: Number,
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: ["Product", "Package"],
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
  module.exports = mongoose.model("addCart", addCart);
