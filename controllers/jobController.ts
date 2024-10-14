import { Request, Response } from "express";
import Job from "../models/Job";
import {
  findJobByIdService,
  findJobsService,
  newJobService,
} from "../services/jobService";
import { findUserByIdService } from "../services/userService";
import {
  connectionError,
  job_already_applied,
  job_applied,
  job_posted,
  not_allowed,
  not_found,
} from "../utils/messages";

// create a new job
const newJobController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user && user.userRole === "client") {
      const newJob = await newJobService({
        jobPoster: user.id,
        ...req.body,
      });

      res.status(200).json({ message: job_posted, data: newJob });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const findJobsController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const pageSize = 10; // Number of items to return per page

      const jobs = await findJobsService({}, page, pageSize);

      // Convert query to an integer if it's a valid number, otherwise set it to null
      const budgetQuery = !isNaN(query) ? parseInt(query) : null;
      // Convert 'query' to a string if it's not already a string
      const queryString = typeof query === "string" ? query : "";

      const filteredJobs = await findJobsService(
        {
          $or: [
            { jobCategory: { $regex: queryString, $options: "i" } },
            { serviceType: { $regex: queryString, $options: "i" } },
            { budget: { $lte: budgetQuery } },
          ],
        },
        page,
        pageSize
      );

      const totalRecords = await Job.countDocuments();

      const totalPages = Math.ceil(totalRecords / pageSize);
      const currentPage = parseInt(page) || 1;

      let result = jobs;
      if (query) {
        result = filteredJobs;
      } else {
        result = jobs;
      }

      const response = {
        totalPages,
        currentPage,
        length: totalRecords,
        jobs: result,
      };

      res.status(200).json({ data: response });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const findJobController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const job = await findJobByIdService(req.params.id);

      if (job) {
        if (job.applicants.includes(user.id)) {
          res.status(200).json({ data: job, message: job_already_applied });
        } else {
          res.status(200).json({ data: job, message: "" });
        }
      } else {
        res.status(404).json({ message: not_found });
      }
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const jobApplicationController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const job = await findJobByIdService(req.params.id);

      if (job) {
        if (!job.applicants.includes(user.id)) {
          await job.updateOne({ $push: { applicants: user.id } });

          res.status(200).json({ message: job_applied });
        } else {
          res.status(200).json({ message: job_already_applied });
        }
      } else {
        res.status(404).json({ message: not_found });
      }
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

export {
  newJobController,
  findJobsController,
  findJobController,
  jobApplicationController,
};
