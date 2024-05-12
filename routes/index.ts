const router = require("express").Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const jobRoute = require("./job");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/user", userRoute);
router.use("/api/v1/job", jobRoute);

module.exports = router;
