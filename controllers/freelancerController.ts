import User from "../models/User";
import { findFreelancerService } from "../services/freelancerService";
import { findUserByIdService } from "../services/userService";
import { connectionError, not_allowed } from "../utils/messages";

type Filter = {
  userRole: string;
  $or?: Array<
    | { skills?: { $elemMatch: { $regex: string; $options: string } } }
    | { country: { $regex: string; $options: string } }
    | { userRole: string }
  >;
};

const findFreelancerController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const pageSize = 10; // Number of items to return per page

      // const firstQuery = user2

      const freelancers = await findFreelancerService({}, page, pageSize);

      // Convert 'query' to a string if it's not already a string
      const queryString = typeof query === "string" ? query : "";

      // Prepare the filter object
      let filter: Filter = { userRole: "freelancer" };

      if (queryString) {
        filter.$or = [
          { skills: { $elemMatch: { $regex: queryString, $options: "i" } } },
          { country: { $regex: queryString, $options: "i" } },
        ];
      }

      const filteredFreelancers = await findFreelancerService(
        filter,
        page,
        pageSize
      );

      const totalRecords = await User.countDocuments(filter);

      const totalPages = Math.ceil(totalRecords / pageSize);
      const currentPage = parseInt(page) || 1;

      let result = freelancers;
      if (query) {
        result = filteredFreelancers;
      } else {
        result = freelancers;
      }

      const response = {
        totalPages,
        currentPage,
        length: totalRecords,
        freelancers: result,
      };

      res.status(200).json({ data: response });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

export { findFreelancerController };
