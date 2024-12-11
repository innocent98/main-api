import {
  createMessageController,
  getConversationsController,
  getMessagesController,
} from "../controllers/messageController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.post(
  "/create/:id",
  verifyTokenAndAuthorization,
  createMessageController
);

router.get(
  "/conversations",
  verifyTokenAndAuthorization,
  getConversationsController
);

router.get("/:id", verifyTokenAndAuthorization, getMessagesController);

module.exports = router;
