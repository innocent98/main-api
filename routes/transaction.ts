import {
  fundBalanceController,
  getTransactionsController,
} from "../controllers/transactionController";
import { verifyTokenAndAuthorization } from "../utils/jwt";

const router = require("express").Router();

router.post(
  "/make-transaction",
  verifyTokenAndAuthorization,
  fundBalanceController
);

router.get(
  "/transactions",
  verifyTokenAndAuthorization,
  getTransactionsController
);

module.exports = router;
