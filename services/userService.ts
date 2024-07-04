import User from "../models/User";
import { prohibitedPhrases } from "../utils/prohibitedPhrases";

// find all users
const findUsersService = async () => {
  const users = await User.find();
  return users;
};

// find a user
const findOneUserService = async (userInfo: object) => {
  const user = await User.findOne(userInfo);
  return user;
};

const findUserByIdService = async (userId: String) => {
  const user = await User.findById(userId);
  return user;
};

const findUserAndUpdate = async (userId: String, userInfo: any) => {
  // Update the user's information
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: userInfo },
    { new: true }
  );

  return updatedUser;
};

export {
  findUsersService,
  findOneUserService,
  findUserByIdService,
  findUserAndUpdate,
};

// module.exports = { findOneUserService };
