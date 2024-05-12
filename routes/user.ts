import {
  findUserController,
  updateUserController,
} from "../controllers/userController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.get("/profile", verifyTokenAndAuthorization, findUserController);

router.put(
  "/profile/update",
  verifyTokenAndAuthorization,
  updateUserController
);

module.exports = router;
