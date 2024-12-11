const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String, required: true },
    lastMessageSender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    isLastMessageRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
