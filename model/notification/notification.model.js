const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const NotificationSent = new Schema( 
  {
    notificationSent: String,
    userId: {
      type : mongoose.Types.ObjectId,
      ref : "User"
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
module.exports = mongoose.model("NotificationSent", NotificationSent);