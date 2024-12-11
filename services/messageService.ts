import Message from "../models/Message";
import { message } from "../utils/interfaces";

const createMessageService = async (messageInfo: message) => {
  const message = new Message(messageInfo);
  const savedMessage = await message.save();
  return savedMessage;
};

const getMessagesService = async (
  query: any,
  page: string,
  pageSize: number
) => {
  const messages = await Message.find(query)
    .sort({ createdAt: -1 }) // Sort in descending order
    .populate([
      { path: "sender", select: "firstName lastName" },
      { path: "receiver", select: "firstName lastName" },
    ])
    .select({ updatedAt: 0 })
    .skip((parseInt(page) - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return messages;
};

const getMessagesBySenderAndReceiverService = async (
  senderId: string,
  receiverId: string,
  page: string,
  pageSize: number
) => {
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  })
    .sort({ createdAt: -1 }) // Sort in descending order
    .select({})
    .skip((parseInt(page) - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return messages;
};

export { createMessageService, getMessagesService };
