import User from "../models/User";
import { userReg } from "../utils/interfaces";

// register a user
const registerUserService = async (userInfo: userReg) => {
  const newUser = new User(userInfo);
  const savedUser = await newUser.save();
  return savedUser;
};

export { registerUserService };

// module.exports = { registerUserService, loginUserService };
