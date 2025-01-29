import { Types } from "mongoose";

export interface userReg {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  userRole: String;
  signinType: string;
  isEmailVerified?: boolean;
}

export interface userInfo {
  _id: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  userRole: String;
  isEmailVerified: boolean;
}

export enum jobStatus {
  Pending = "pending",
  Published = "published",
}

export interface jobReg {
  jobPoster: Types.ObjectId;
  jobCategory: string;
  serviceType: string;
  jobTitle: string;
  jobDesc: string;
  requiredSkills: string;
  noToHire: number;
  budget: number;
  country: string;
  startDate: Date;
  duration: string;
  status: jobStatus;
}

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

export interface transaction {
  user: Types.ObjectId;
  transactionType: TransactionType;
  currencyType: CurrencyType;
  transactionStatus: TransactionStatus;
  amount: number;
}

export type message = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  conversation: Types.ObjectId;
};

export type conversation = {
  participants: Types.ObjectId[];
  lastMessage: string;
  lastMessageSender: Types.ObjectId;
};
