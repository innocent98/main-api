export interface userReg {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  userRole: String;
}

export interface singleUser {
  params: String;
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
