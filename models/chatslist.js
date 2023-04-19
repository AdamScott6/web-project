const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatslistSchema = new Schema(
  {
    name: String,
    participants: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

);

const Chatslist = mongoose.model("Chatslist", chatslistSchema);
module.exports = Chatslist;
