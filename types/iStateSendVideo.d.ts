import { IStateSendVideoQuery } from "./iStateSendVideoQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendVideo {
  error?: Error;
  query?: IStateSendVideoQuery;
  result?: IMessage;
}
