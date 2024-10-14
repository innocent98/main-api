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
  user2: string;
  transactionType: TransactionType;
  currencyType: CurrencyType;
  transactionStatus: TransactionStatus;
  amount: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  wallet: string;
};

type TransactionModel = Model<Transaction>;

declare const Transaction: TransactionModel;

export default Transaction;
