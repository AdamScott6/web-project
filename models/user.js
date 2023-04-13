const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./models/post");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountIsPrivate: {
      type: Boolean,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
