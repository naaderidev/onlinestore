const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expTime: {
      type: Number,
      required: true,
    },
    // useTimes: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

const otpModel = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

module.exports = otpModel;
