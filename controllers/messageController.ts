import express, { Response } from "express";
import {
  createMessageService,
  getMessagesService,
} from "../services/messageService";
import { findUserByIdService } from "../services/userService";
import { connectionError, not_allowed } from "../utils/messages";

const createMessageController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const message = await createMessageService({
        sender: user.id,
        receiver: req.params.id,
        content: req.body.content,
      });
      res.status(200).json({ data: message });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (error) {
    res.status(500).json({ message: connectionError });
  }
};

const getMessagesBySenderAndReceiverController = async (
  req: any,
  res: Response
) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const pageSize = 10; // Number of items to return per page

      const messages = await getMessagesService(
        {
          $or: [{ sender: user.id }, { receiver: user.id }],
        },
        page,
        pageSize
      );

      res.status(200).json({ data: messages });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (error) {
    res.status(500).json({ message: connectionError });
  }
};

export { createMessageController, getMessagesBySenderAndReceiverController };
