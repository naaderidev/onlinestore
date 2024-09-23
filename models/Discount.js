const mongoose = require("mongoose");
require("./User");

const discountSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    countUse: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
      required: false,
    },
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const discountModel =
  mongoose.models?.Discount || mongoose.model("Discount", discountSchema);

export default discountModel;
