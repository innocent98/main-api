// User.d.ts

import { Document, Model } from "mongoose";

export enum UserRole {
  Client = "client",
  Freelancer = "freelancer",
}

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRole: UserRole;
  isEmailVerified: boolean;
  resetCode?: string;
  resetCodeExpIn?: Date;
  gender?: string;
  bio?: string;
  skills?: Array<string>;
  photo?: string;
  country?: string;
  state?: string;
  zip?: string;
  phone?: string;
  hourRate?: number;
  myWorks?: Array<object>;
  companyLogo?: string;
  companyName?: string;
  companyDesc?: string;
  companyInterests?: Array<string>;
  companyLinks?: Array<string>;
  availableBalance?: number;
  cryptoBalance?: number;
  walletAddress?: string;
};

type UserModel = Model<User>;

declare const User: UserModel;

export default User;
