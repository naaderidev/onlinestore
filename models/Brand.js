const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let BrandModel = mongoose.models?.Brand || mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
