import { Model } from "mongoose";

export enum TransactionType {
  Withdraw = "withdraw",
  Fund = "fund",
  Transfer = "transfer",
}

export enum CurrencyType {
  Currency = "currency",
  Crypto = "crypto",
}

export enum TransactionStatus {
  Pending = "pending",
  Completed = "completed",
  Rejected = "rejected",
}

type Transaction = {
  user: string;
  transactionType: TransactionType;
  currencyType: CurrencyType;
  transactionStatus: TransactionStatus;
  amount: number;
};

type TransactionModel = Model<Transaction>;

declare const Transaction: TransactionModel;

export default Transaction;
