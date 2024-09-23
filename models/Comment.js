const mongoose = require("mongoose");
require("./Product");

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: () => Date.now(),
      immutable: false,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    mainComment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const commentModel =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export default commentModel;
