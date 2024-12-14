const mongoose = require("mongoose");
const { prohibitedPhrases } = require("../utils/prohibitedPhrases");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return !prohibitedPhrases.some((pattern) => pattern.test(v));
        },
        message: (props) => `Message contains prohibited content: ${props.value}`,
      },
    },
    conversation: { type: mongoose.Schema.Types.ObjectId, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
