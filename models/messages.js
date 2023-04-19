const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chatslist" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
  },
);

const Messages = mongoose.model("Messages", messagesSchema);
module.exports = Messages;
