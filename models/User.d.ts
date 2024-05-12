// User.d.ts

import { Document, Model } from "mongoose";

export enum UserRole {
  Client = "client",
  Freelancer = "freelancer",
}

interface User {
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
  companyLogo?: string;
  companyName?: string;
  companyDesc?: string;
  companyInterests?: Array<string>;
  companyLinks?: Array<string>;
}

interface UserModel extends Model<User> {
  // [x: string]: any;
  // findOneUser(userInfo: any): Promise<User | null>;
  // Define other custom methods if needed
}

declare const User: UserModel;

export default User;
