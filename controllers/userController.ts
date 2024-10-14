import User from "../models/User";
import {
  findUserAndUpdate,
  findUserByIdService,
} from "../services/userService";
import {
  account_updated,
  connectionError,
  not_allowed,
  not_found,
  prohibited_content,
} from "../utils/messages";
import { prohibitedPhrases } from "../utils/prohibitedPhrases";

// get user self account/profile
const findUserController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const userObject = user?.toObject() as User;

      if (user.userRole === "client") {
        const {
          password,
          resetCode,
          resetCodeExpIn,
          skills,
          photo,
          hourRate,
          myWorks,
          ...others
        } = userObject;

        res.status(200).json({ data: others });
      } else if (user.userRole === "freelancer") {
        const {
          password,
          resetCode,
          resetCodeExpIn,
          companyDesc,
          companyInterests,
          companyLinks,
          companyLogo,
          companyName,
          ...others
        } = userObject;

        res.status(200).json({ data: others });
      }
    } else {
      res.status(404).json({ message: not_found });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

// edit/update a user profile
const updateUserController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Validate the updated bio before updating the user
      const { bio } = req.body;

      if (bio) {
        const isValidBio = !prohibitedPhrases.some((pattern) =>
          pattern.test(bio)
        );
        if (!isValidBio) {
          res.status(400).json(prohibited_content);
          return;
        }
      }

      const updateUser = await findUserAndUpdate(user.id, req.body);

      const userObject = updateUser?.toObject() as User;

      if (user.userRole === "client") {
        const {
          password,
          resetCode,
          resetCodeExpIn,
          skills,
          photo,
          hourRate,
          ...others
        } = userObject;

        res.status(200).json({ message: account_updated, data: others });
      } else if (user.userRole === "freelancer") {
        const {
          password,
          resetCode,
          resetCodeExpIn,
          companyDesc,
          companyInterests,
          companyLinks,
          companyLogo,
          companyName,
          ...others
        } = userObject;

        res.status(200).json({ message: account_updated, data: others });
      }
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

export { findUserController, updateUserController };
