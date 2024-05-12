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
} from "../utils/messages";

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
