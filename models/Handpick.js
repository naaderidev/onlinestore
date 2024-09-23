const mongoose = require("mongoose");

const handpickSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let handpickModel =
  mongoose.models?.Handpick || mongoose.model("Handpick", handpickSchema);

module.exports = handpickModel;
