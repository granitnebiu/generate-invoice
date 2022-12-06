const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
