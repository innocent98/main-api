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

type Filter = {
  $or?: Array<
    | { jobCategory: { $regex: string; $options: string } }
    | { jobTitle: { $regex: string; $options: string } }
    | { budget: { $lte: number | null } }
  >;
};

// create a new job
const newJobController = async (req: any, res: Response) => {
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

const editJobController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user && user.userRole === "client") {
      const job = await findJobByIdService(req.params.id);

      if (job) {
        if (job.jobPoster?.toString() === user.id) {
          await job.updateOne(req.body);

          res.status(200).json({ message: "Job updated successfully" });
        } else {
          res.status(403).json({ message: not_allowed });
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

const deleteJobController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user && user.userRole === "client") {
      const job = await findJobByIdService(req.params.id);

      if (job) {
        if (job.jobPoster.toString() === user.id) {
          await job.deleteOne();

          res.status(200).json({ message: "Job deleted successfully" });
        } else {
          res.status(403).json({ message: not_allowed });
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

const findJobsController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const sanitizedQuery = query || "";

      const pageSize = 10; // Number of items to return per page

      const jobs = await findJobsService({}, page, pageSize);

      // Convert query to an integer if it's a valid number, otherwise set it to null
      const budgetQuery =
        !isNaN(sanitizedQuery) && sanitizedQuery !== ""
          ? parseInt(sanitizedQuery)
          : null;
      // Convert 'query' to a string if it's not already a string
      const queryString =
        typeof sanitizedQuery === "string" ? sanitizedQuery : "";

      let filter: Filter;
      filter = {
        $or: [
          { jobCategory: { $regex: queryString, $options: "i" } },
          { jobTitle: { $regex: queryString, $options: "i" } },
          { budget: { $lte: budgetQuery } },
        ],
      };

      const filteredJobs = await findJobsService(filter, page, pageSize);

      const totalRecords = await Job.countDocuments(filter);

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

const findJobController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const job = await findJobByIdService(req.params.id);

      if (job) {
        if (job?.applicants?.includes(user.id)) {
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
    console.log(err);
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
    console.log(err);
    res.status(500).json({ message: connectionError });
  }
};

const findJobApplicantsController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const job = await findJobByIdService(req.params.id);

      if (job) {
        const applicants = await Job.findById(req.params.id).populate(
          "applicants"
        );

        res.status(200).json({ data: applicants });
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
  editJobController,
  deleteJobController,
  findJobApplicantsController,
};
