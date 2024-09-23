const mongoose = require("mongoose");
require("./User");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    // discountCode: {
    //   type: String,
    //   default: 0,
    // },
    basket: {
      type: Array,
      required: true,
    },
    isAccept: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default orderModel;
