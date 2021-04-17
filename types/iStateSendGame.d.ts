import { IStateSendGameQuery } from "./iStateSendGameQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendGame {
  error?: any;
  query?: IStateSendGameQuery;
  result?: IMessage;
}
