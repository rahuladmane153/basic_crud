const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const distributorDashboard = new Schema(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    total_order_count: Number, 
    pending_order_count: Number, 
    processing_order_count: Number, 
    packing_order_count: Number,
    shipping_order_count: Number,
    delivered_order_count: Number,
    returned_order_count: Number,
    cancel_order_count: Number,
    Reject_order_count: Number,
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("distributorDashboard", distributorDashboard);
