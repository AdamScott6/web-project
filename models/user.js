const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    fullName: String, 
    password: String,
    accountIsPrivate: Boolean,
    aboutMe: String,
    profilePicture: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isLightMode: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
