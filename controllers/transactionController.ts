import { fundBalanceService } from "../services/transactionService";
import { findUserByIdService } from "../services/userService";
import { connectionError, not_allowed } from "../utils/messages";

const fundBalanceController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const newTransaction = await fundBalanceService({
        user: user.id,
        ...req.body,
      });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};
