const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: { type: String },
    user2: { type: String },
    transactionType: {
      type: String,
      enum: ["withdraw", "fund", "transfer"],
      required: true,
    },
    currencyType: {
      type: String,
      enum: ["currency", "crypto"],
      required: true,
    },
    transactionStatus: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
    amount: { type: Number },
    bankName: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    wallet: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
