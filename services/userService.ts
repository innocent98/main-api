import User from "../models/User";

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

const findUserAndUpdate = async (userId: String, userInfo: object) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: userInfo },
    { new: true }
  );

  return user;
};

export {
  findUsersService,
  findOneUserService,
  findUserByIdService,
  findUserAndUpdate,
};

// module.exports = { findOneUserService };
