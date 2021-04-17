import { IStateSendMediaGroupQuery } from "./iStateSendMediaGroupQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendMediaGroup {
  error?: any;
  query?: IStateSendMediaGroupQuery;
  result?: IMessage;
}
