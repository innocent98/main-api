// Job.d.ts

import { Document, Model } from "mongoose";

export enum JobStatus {
  Pending = "pending",
  Published = "published",
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
  status: JobStatus;
};

type JobModel = Model<Job>;

declare const Job: JobModel;

export default Job;
