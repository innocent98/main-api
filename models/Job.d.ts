// Job.d.ts

import { Document, Model } from "mongoose";

export enum JobStatus {
  Pending = "pending",
  Published = "published",
}

interface Job {
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
}

interface JobModel extends Model<Job> {}

declare const Job: JobModel;

export default Job;
