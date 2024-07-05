import Transaction from "../models/Transaction";
import { transaction } from "../utils/interfaces";

const fundBalanceService = async (transInfo: transaction) => {
  const fundBalance = new Transaction(transInfo);
  const savedBalance = await fundBalance.save();
  return savedBalance;
};

const getTransactionsService = async (
  query: any,
  page: string,
  pageSize: number
) => {
  const transactions = await Transaction.find(query)
    .sort({ createdAt: -1 })
    .select({})
    .skip((parseInt(page) - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return transactions;
};

export { fundBalanceService, getTransactionsService };
