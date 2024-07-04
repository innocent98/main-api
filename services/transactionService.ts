import Transaction from "../models/Transaction";
import { transaction } from "../utils/interfaces";

const fundBalanceService = async (transInfo: transaction) => {
  const fundBalance = new Transaction(transInfo);
  const savedBalance = await fundBalance.save();
  return savedBalance;
};

export { fundBalanceService };
