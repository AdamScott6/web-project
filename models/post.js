const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
