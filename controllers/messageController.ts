import express, { Response } from "express";
import {
  createMessageService,
  getMessagesService,
} from "../services/messageService";
import { findUserByIdService } from "../services/userService";
import { connectionError, not_allowed } from "../utils/messages";
import {
  createConversationService,
  getConversationByIdService,
  getConversationService,
  getConversationsService,
  updateConversationService,
} from "../services/conversationService";
import Conversation from "../models/Conversation";
import Message from "../models/Message";

const createMessageController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      const conversation = await getConversationService({
        participants: { $all: [user.id, req.params.id] },
      });

      if (conversation) {
        const message = await createMessageService({
          sender: user.id,
          receiver: req.params.id,
          content: req.body.content,
          conversation: conversation.id,
        });
        const payload = {
          id: conversation.id,
          // participants: [user.id, req.params.id],
          lastMessage: req.body.content,
          lastMessageSender: user.id,
        };

        await updateConversationService(payload);

        res.status(200).json({ data: message });
      } else {
        const payload = {
          participants: [user.id, req.params.id],
          lastMessage: req.body.content,
          lastMessageSender: user.id,
        };
        // Create a new conversation for the two users
        const newConversation = await createConversationService(payload);

        const message = await createMessageService({
          sender: user.id,
          receiver: req.params.id,
          content: req.body.content,
          conversation: newConversation.id,
        });

        res.status(200).json({ data: message });
      }
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const getConversationsController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const pageSize = 20; // Number of items to return per page

      const conversation = await getConversationsService(
        { participants: { $in: [user.id] } },
        page,
        pageSize
      );

      const totalRecords = await Conversation.countDocuments({
        participants: { $in: [user.id] },
      });
      const totalPages = Math.ceil(totalRecords / pageSize);
      const currentPage = parseInt(page) || 1;

      const response = {
        totalPages,
        currentPage,
        length: totalRecords,
        conversation,
      };

      res.status(200).json({ data: response });
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
    res.status(500).json({ message: connectionError });
  }
};

const getMessagesController = async (req: any, res: Response) => {
  try {
    const user = await findUserByIdService(req.user.id);

    if (user) {
      // Pagination parameters
      const { query, page } = req.query;

      const pageSize = 20; // Number of items to return per page

      const conversation = await getConversationByIdService(req.params.id);

      if (conversation && conversation.participants.includes(user.id)) {
        const messages = await getMessagesService(
          { conversation: req.params.id },
          page,
          pageSize
        );

        const totalRecords = await Message.countDocuments({
          conversation: req.params.id,
        });
        const totalPages = Math.ceil(totalRecords / pageSize);
        const currentPage = parseInt(page) || 1;

        const response = {
          totalPages,
          currentPage,
          length: totalRecords,
          messages,
        };

        res.status(200).json({ data: response });
      } else {
        return res.status(403).json({ message: not_allowed });
      }
    } else {
      res.status(403).json({ message: not_allowed });
    }
  } catch (err) {
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

export {
  createMessageController,
  getConversationsController,
  getMessagesController,
  getMessagesBySenderAndReceiverController,
};
