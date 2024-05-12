// const { findOneUserService } = require("../services/userService");
import { confirmationEmail } from "../configs/new_registration";
import { registerUserService } from "../services/authService";
import {
  findOneUserService,
  findUserAndUpdate,
  findUserByIdService,
} from "../services/userService";
import { jwt } from "../utils/jwt";
import {
  accountCreated,
  connectionError,
  email_verification,
  email_verified,
  existingUser,
  forgotPassword,
  incorrectCredentials,
  reset_code_exps,
  reset_password,
  userNotFound,
  verify_email,
} from "../utils/messages";
import crypto from "crypto";

import bcrypt from "bcrypt";
import { forgotPasswordEmail } from "../configs/forgot_password";

// async function generateUniqueReferralCode() {
//   let referralCode;
//   let isUnique = false;

//   while (!isUnique) {
//     referralCode = crypto.randomBytes(32).toString("hex").slice(0, 6);

//     // Check if the code already exists in the database
//     const existingUser = await findUserByIdServerice({ referralCode });

//     if (!existingUser) {
//       isUnique = true;
//     }
//   }

//   return referralCode;
// }

// register a user

const registerUserController = async (req: any, res: any) => {
  try {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const findUser = await findOneUserService({
      email: req.body.email,
    });

    if (findUser) {
      res.status(400).json({ message: existingUser });
    } else {
      const newUser = await registerUserService({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        userRole: req.body.userRole,
      });

      // Convert Mongoose document to plain JavaScript object
      const newUserObject = newUser.toObject();

      const { password, ...others } = newUserObject;

      const accessToken = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SEC || "",
        {
          expiresIn: "10m",
        }
      );

      confirmationEmail(newUser.email, accessToken);

      res.status(200).json({ message: accountCreated, data: others });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

// login a user
const loginUserController = async (req: any, res: any) => {
  try {
    const findUser = await findOneUserService({
      email: req.body.email,
    });

    if (findUser) {
      if (await bcrypt.compare(req.body.password, findUser.password)) {
        if (findUser.isEmailVerified) {
          const accessToken = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.JWT_SEC || "",
            {
              expiresIn: "30d",
            }
          );

          res.status(200).json({ data: accessToken });
        } else {
          const accessToken = jwt.sign(
            { id: findUser._id },
            process.env.JWT_SEC || "",
            {
              expiresIn: "10m",
            }
          );

          confirmationEmail(findUser.email, accessToken);

          res.status(403).json({ message: verify_email, error: "Error" });
        }
      } else {
        res.status(400).json({ message: incorrectCredentials });
      }
    } else {
      res.status(400).json({ message: incorrectCredentials });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

// forgot password
const forgotPasswordController = async (req: any, res: any) => {
  const min = 100000;
  const max = 900000;

  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  const currentTime = new Date();
  const futureTime = new Date(currentTime.getTime() + 5 * 60 * 1000);

  try {
    const findUser = await findOneUserService({
      email: req.body.email,
    });

    if (findUser) {
      await findUser.updateOne({ $set: { resetCode: randomCode } });
      await findUser.updateOne({ $set: { resetCodeExpIn: futureTime } });

      forgotPasswordEmail(findUser.email, randomCode);

      res.status(200).json({ message: forgotPassword });
    } else {
      res.status(404).json({ message: userNotFound });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const confirmPasswordCode = async (req: any, res: any) => {
  try {
    const findUser = await findOneUserService({
      resetCode: req.body.resetCode,
    });

    if (findUser) {
      const currentTime = new Date().getTime();
      const codeExps = findUser.resetCodeExpIn?.getTime() || 0;

      if (codeExps >= currentTime) {
        const accessToken = jwt.sign(
          { id: findUser._id, email: findUser.email },
          process.env.JWT_SEC || "",
          {
            expiresIn: "5m",
          }
        );

        res.status(200).json({ data: accessToken });
      } else {
        res.status(400).json({ message: reset_code_exps });
      }
    } else {
      res.status(400).json({ message: reset_code_exps });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const resetPassword = async (req: any, res: any) => {
  // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const findUser = await findUserByIdService(req.user.id);

    if (findUser) {
      await findUserAndUpdate(findUser.id, {
        password: hashedPassword,
      });

      await findUser.updateOne({ $set: { resetCode: null } });
      await findUser.updateOne({ $set: { resetCodeExpIn: null } });

      res.status(200).json({ data: reset_password });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const verifyEmail = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user && !user.isEmailVerified) {
      await user.updateOne({ $set: { isEmailVerified: true } });

      res.status(200).json({ message: email_verification, success: "Success" });
    } else {
      res.status(201).json({ message: email_verified, success: "Success" });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError, error: "Error" });
  }
};

export {
  registerUserController,
  forgotPasswordController,
  loginUserController,
  confirmPasswordCode,
  resetPassword,
  verifyEmail,
};
