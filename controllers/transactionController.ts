import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import {
  fundBalanceService,
  getTransactionsService,
} from "../services/transactionService";
import { findUserByIdService } from "../services/userService";
import {
  account_not_found,
  connectionError,
  insufficient_balance,
  not_allowed,
  not_found,
  transaction_success,
} from "../utils/messages";

type Filter = {
  user: string;
  $or?: Array<
    | { transactionType: { $regex: string; $options: string } }
    | { currencyType: { $regex: string; $options: string } }
    | { transactionStatus: { $regex: string; $options: string } }
  >;
};

type Filter2 = {
  user2: string;
  $or?: Array<
    | { transactionType: { $regex: string; $options: string } }
    | { currencyType: { $regex: string; $options: string } }
    | { transactionStatus: { $regex: string; $options: string } }
  >;
};

const fundBalanceFunction = async (
  user: any,
  transferTo: any,
  req: any,
  res: any
) => {
  const newTransaction = await fundBalanceService({
    user: user.id,
    user2: transferTo ? transferTo.id : "",
    transactionStatus:
      req.body.transactionType === "withdraw" ? "pending" : "completed",
    ...req.body,
  });

  if (
    req.body.transactionType === "withdraw" ||
    req.body.transactionType === "transfer"
  ) {
    if (req.body.currencyType === "currency") {
      await user.updateOne({ $inc: { availableBalance: -req.body.amount } });
    }

    if (req.body.currencyType === "crypto") {
      await user.updateOne({ $inc: { cryptoBalance: -req.body.amount } });
    }
  }

  if (req.body.transactionType === "fund") {
    if (req.body.currencyType === "currency") {
      await user.updateOne({ $inc: { availableBalance: +req.body.amount } });
    }

    if (req.body.currencyType === "crypto") {
      await user.updateOne({ $inc: { cryptoBalance: +req.body.amount } });
    }
  }

  if (req.body.transactionType === "transfer") {
    if (req.body.currencyType === "currency") {
      await transferTo.updateOne({
        $inc: { availableBalance: +req.body.amount },
      });
    }

    if (req.body.currencyType === "crypto") {
      await transferTo.updateOne({ $inc: { cryptoBalance: +req.body.amount } });
    }
  }

  res.status(200).json({ message: transaction_success, data: newTransaction });
};

const fundBalanceController = async (req: any, res: any) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      if (req.body.transactionType === "withdraw") {
        if (req.body.currencyType === "currency") {
          if (user.availableBalance < req.body.amount) {
            res.status(400).json({ message: insufficient_balance });
          } else {
            fundBalanceFunction(user, null, req, res);
          }
        }

        if (req.body.currencyType === "crypto") {
          if (user.cryptoBalance < req.body.amount) {
            res.status(400).json({ message: insufficient_balance });
          } else {
            fundBalanceFunction(user, null, req, res);
          }
        }
      }

      if (req.body.transactionType === "fund") {
        fundBalanceFunction(user, null, req, res);
      }

      if (req.body.transactionType === "transfer") {
        const transferTo = await findUserByIdService(req.query.transferTo);

        if (transferTo) {
          fundBalanceFunction(user, transferTo, req, res);
        } else {
          res.status(404).json({ message: account_not_found });
        }
      }
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const getTransactionsController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const pageSize = 10; // Number of items to return per page

      const userTransactionsQuery1 = await getTransactionsService(
        { user: user.id },
        page,
        pageSize
      );
      const userTransactionsQuery2 = await getTransactionsService(
        { user2: user.id },
        page,
        pageSize
      );

      const transactions = [
        ...userTransactionsQuery1,
        ...userTransactionsQuery2,
      ];

      // Convert 'query' to a string if it's not already a string
      const queryString = typeof query === "string" ? query : "";

      // Prepare the filter object
      let filter1: Filter = { user: user.id };
      let filter2: Filter2 = { user2: user.id };

      if (queryString) {
        filter1.$or = [
          { transactionType: { $regex: queryString, $options: "i" } },
          { currencyType: { $regex: queryString, $options: "i" } },
          { transactionStatus: { $regex: queryString, $options: "i" } },
        ];

        filter2.$or = [
          { transactionType: { $regex: queryString, $options: "i" } },
          { currencyType: { $regex: queryString, $options: "i" } },
          { transactionStatus: { $regex: queryString, $options: "i" } },
        ];
      }

      const filteredTransactions1 = await getTransactionsService(
        filter1,
        page,
        pageSize
      );

      const filteredTransactions2 = await getTransactionsService(
        filter2,
        page,
        pageSize
      );

      const filteredTransactions = [
        ...filteredTransactions1,
        ...filteredTransactions2,
      ];

      let filter = filter1 || filter2;

      let filterCount = {};
      if (filter1 && filter2) {
        filterCount = filter1 && filter2;
      }

      // console.log(filter);

      const totalRecords = await Transaction.countDocuments(filter);
      const totalPages = Math.ceil(totalRecords / pageSize);
      const currentPage = parseInt(page) || 1;

      let result = transactions;
      if (query) {
        result = filteredTransactions;
      } else {
        result = transactions;
      }

      const response = {
        totalPages,
        currentPage,
        length: totalRecords,
        transactions: result,
      };

      res.status(200).json({ data: response });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

export { fundBalanceController, getTransactionsController };
