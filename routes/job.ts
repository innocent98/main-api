import {
  deleteJobController,
  editJobController,
  findJobApplicantsController,
  findJobController,
  findJobsController,
  jobApplicationController,
  newJobController,
} from "../controllers/jobController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.post("/create", verifyTokenAndAuthorization, newJobController);
router.put("/edit/:id", verifyTokenAndAuthorization, editJobController);
router.delete("/:id", verifyTokenAndAuthorization, deleteJobController);
router.get("/jobs", verifyTokenAndAuthorization, findJobsController);
router.get("/:id", verifyTokenAndAuthorization, findJobController);
router.put("/apply/:id", verifyTokenAndAuthorization, jobApplicationController);
router.get("/applicants/:id", verifyTokenAndAuthorization, findJobApplicantsController);

module.exports = router;
