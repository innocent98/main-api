import { findFreelancerController } from "../controllers/freelancerController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.get(
  "/freelancers",
  verifyTokenAndAuthorization,
  findFreelancerController
);

module.exports = router;
