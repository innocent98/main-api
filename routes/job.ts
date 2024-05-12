import {
  findJobController,
  findJobsController,
  newJobController,
} from "../controllers/jobController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.post("/create", verifyTokenAndAuthorization, newJobController);
router.get("/jobs", verifyTokenAndAuthorization, findJobsController);
router.get("/:id", verifyTokenAndAuthorization, findJobController);

module.exports = router;
