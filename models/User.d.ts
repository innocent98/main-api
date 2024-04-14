// User.d.ts

import { Document, Model } from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRole: string;
  isEmailVerified: boolean;
  resetCode?: string;
  resetCodeExpIn?: Date;
}

interface UserModel extends Model<User> {
  findOneUser(userInfo: any): Promise<User | null>;
  // Define other custom methods if needed
}

declare const User: UserModel;

export default User;
