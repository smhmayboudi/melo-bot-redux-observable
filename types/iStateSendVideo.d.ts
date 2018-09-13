import { IStateSendVideoQuery } from "./iStateSendVideoQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendVideo {
  error?: any;
  query?: IStateSendVideoQuery;
  result?: IMessage;
}