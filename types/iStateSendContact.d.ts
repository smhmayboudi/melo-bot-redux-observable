import { IStateSendContactQuery } from "./iStateSendContactQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendContact {
  error?: any;
  query?: IStateSendContactQuery;
  result?: IMessage;
}
