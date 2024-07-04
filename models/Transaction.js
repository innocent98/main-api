const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: { type: String },
    transactionType: { type: String, enum: ["withdraw", "fund", "transfer"] },
    currencyType: { type: String, enum: ["currency", "crypto"] },
    transactionStatus: { type: String, enum: ["pending", "completed", "rejected"] },
    amount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
