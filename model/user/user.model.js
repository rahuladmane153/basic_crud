const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const User = new Schema({
    designation: {
        type: String,
        enum: [
            "Admin",
            "User",
            "Distributor",
            "Employee",
            "Merchant"
        ],
    },
    firstName: String,
    lastName: String,
    deviceToken: String,
    email: String,
    mobileNumber: String,
    pincode: Number,
    country: String,
    password: String,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    dob: String,
    isMobileVerified: {
        type: String,
        enum: ["Not", "Verified"],
        default: "Not"
    },
    isEmailVerified: {
        type: String,
        enum: ["Not", "Verified"],
        default: "Not"
    },
    otp: {
        type: String,
    },
    status: {
        type: String,
        default: "active",
    },

}, {
    timestamps: true,
});
module.exports = mongoose.model("User", User)
