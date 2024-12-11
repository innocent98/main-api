import { Document, Model, Types } from "mongoose";

type Message = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  conversation: Types.ObjectId;
  isRead: boolean;
};

type MessageModel = Model<Message>;

declare const Message: MessageModel;

export default Message;
