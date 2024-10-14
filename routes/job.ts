import {
  findJobController,
  findJobsController,
  jobApplicationController,
  newJobController,
} from "../controllers/jobController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.post("/create", verifyTokenAndAuthorization, newJobController);
router.get("/jobs", verifyTokenAndAuthorization, findJobsController);
router.get("/:id", verifyTokenAndAuthorization, findJobController);
router.put("/:id", verifyTokenAndAuthorization, jobApplicationController);

module.exports = router;
