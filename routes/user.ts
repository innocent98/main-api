import {
  findUserController,
  findUserProfileController,
  updateUserController,
  updateUserPasswordController,
} from "../controllers/userController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.get("/profile", verifyTokenAndAuthorization, findUserController);
router.get("/profile/:id", verifyTokenAndAuthorization, findUserProfileController);

router.put(
  "/profile/update",
  verifyTokenAndAuthorization,
  updateUserController
);
router.put(
  "/password/update",
  verifyTokenAndAuthorization,
  updateUserPasswordController
);

module.exports = router;
