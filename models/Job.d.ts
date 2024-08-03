// Job.d.ts

import { Document, Model } from "mongoose";

export enum Status {
  Pending = "pending",
  Published = "published",
}

export enum JobStatus {
  Open = "open",
  Closed = "closed",
}

type Job = {
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
  applicants: string[];
  jobStatus: JobStatus;
  status: Status;
};

type JobModel = Model<Job>;

declare const Job: JobModel;

export default Job;
