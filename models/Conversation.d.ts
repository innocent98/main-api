import { Document, Model, Types } from "mongoose";

type Conversation = {
  participants: Types.ObjectId[];
  lastMessage: string;
  lastMessageSender: Types.ObjectId;
  isLastMessageRead: boolean;
};

type ConversationModel = Model<Conversation>;

declare const Conversation: ConversationModel;

export default Conversation;
