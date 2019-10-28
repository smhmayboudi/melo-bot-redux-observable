import { IStateSendLocationQuery } from "./iStateSendLocationQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendLocation {
  error?: any;
  query?: IStateSendLocationQuery;
  result?: IMessage;
}
