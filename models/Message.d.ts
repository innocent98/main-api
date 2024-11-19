import { Document, Model } from "mongoose";

type Message = {
  sender: string;
  receiver: string;
  content: string;
};

type MessageModel = Model<Message>;

declare const Message: MessageModel;

export default Message;
