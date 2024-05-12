import Job from "../models/Job";
import { jobReg } from "../utils/interfaces";

// create a new job
const newJobService = async (jobInfo: jobReg) => {
  const newJob = new Job(jobInfo);
  const savedJob = await newJob.save();
  return savedJob;
};

const findJobsService = async (query: any, page: string, pageSize: number) => {
  const jobs = await Job.find(query)
    .sort({ createdAt: -1 }) // Sort in descending order
    .select({ jobPoster: 0, status: 0, updatedAt: 0 })
    .skip((parseInt(page) - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return jobs;
};

const findJobByIdService = async (query: any) => {
  const job = await Job.findById(query)
    .select({ jobPoster: 0, updatedAt: 0 })
    .exec();

  return job;
};

export { newJobService, findJobsService, findJobByIdService };
