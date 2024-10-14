import {
  confirmPasswordCode,
  forgotPasswordController,
  loginUserController,
  registerUserController,
  resetPassword,
  verifyEmail,
} from "../controllers/authController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.post("/forgot-password", forgotPasswordController);

router.post("/confirm-password-code", confirmPasswordCode);

router.put("/reset-password", verifyTokenAndAuthorization, resetPassword);

router.put("/verify-email", verifyTokenAndAuthorization, verifyEmail);

module.exports = router;
