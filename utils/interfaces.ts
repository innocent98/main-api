export interface userReg {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  userRole: String;
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
  jobPoster: string;
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
