const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  }
);

let CategoryModel =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
