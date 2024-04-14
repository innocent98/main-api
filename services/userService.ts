import User from "../models/User";
import { singleUser, userInfo } from "../utils/interfaces";
// import { User } from "../utils/models";

// find a user
const findOneUserService = async (userInfo: object) => {
  const user = await User.findOne(userInfo);
  return user;
};

const findUserByIdServerice = async (userId: String) => {
  const user = await User.findById(userId);
  return user;
};

const findUserAndUpdate = async (userId: String, userInfo: object) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: userInfo },
    { new: true }
  );

  return user;
};

export { findOneUserService, findUserByIdServerice, findUserAndUpdate };

// module.exports = { findOneUserService };
