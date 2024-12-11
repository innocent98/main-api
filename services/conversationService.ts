import Conversation from "../models/Conversation";
import { conversation } from "../utils/interfaces";

const createConversationService = async (messageInfo: conversation) => {
  const conversation = new Conversation(messageInfo);
  const savedConversation = await conversation.save();
  return savedConversation;
};

const getConversationsService = async (
  query: any,
  page: string,
  pageSize: number
) => {
  const conversations = await Conversation.find(query)
    .sort({ createdAt: -1 }) // Sort in descending order
    .select({})
    .populate({ path: "participants", select: "firstName lastName" })
    .skip((parseInt(page) - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return conversations;
};

const getConversationService = async (query: any) => {
  const conversations = await Conversation.findOne(query).exec();
  return conversations;
};
const getConversationByIdService = async (query: any) => {
  const conversations = await Conversation.findById(query).exec();
  return conversations;
};

const updateConversationService = async (messageInfo: conversation | any) => {
  const conversation = await Conversation.findByIdAndUpdate(
    messageInfo.id,
    { $set: messageInfo },
    { new: true }
  ).exec();

  return conversation;
};

export {
  createConversationService,
  getConversationsService,
  getConversationService,
  getConversationByIdService,
  updateConversationService,
};
