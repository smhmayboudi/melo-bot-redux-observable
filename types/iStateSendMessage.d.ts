import { IStateSendMessageQuery } from "./iStateSendMessageQuery";
import { IMessage } from "../types/telegramBot/types/iMessage";

export interface IStateSendMessage {
  error?: any;
  query?: IStateSendMessageQuery;
  result?: IMessage;
}