const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // username: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // province: {
    //   type: String,
    //   required: true,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models?.User || mongoose.model("User", userSchema);

export default userModel;
