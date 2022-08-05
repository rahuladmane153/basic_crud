const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const orderDetails = new Schema(
  {
    order_no: Number,
    order_date: String,
    orderStatus:{
        type: String,
        enum: ["Pending", "Package", "Delivered"],
    },
    customer_name: String,
    customer_mobile: String,
    customer_email : String,
    customer_address: String,
    payment_status : {
        type: String,
        enum: ["Pending", "Successfull"],
    },
    grand_total : String,
    product_name: String,
    category_name: String,
    product_unit_price: String,
    product_quantity: String,
    amount: String,
    product_total_price: String,
    merchandName: String,
    payment_status : {
      type: String,
      enum: ["Sucess", "Failed"],
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
module.exports = mongoose.model("orderDetails", orderDetails);
