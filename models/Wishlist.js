const mongoose = require("mongoose");
require("./User");
require("./Product");

const wishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const wishlistModel =
  mongoose.models?.Wishlist || mongoose.model("Wishlist", wishlistSchema);

export default wishlistModel;
