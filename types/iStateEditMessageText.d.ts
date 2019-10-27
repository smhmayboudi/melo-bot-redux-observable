import { IStateEditMessageTextQuery } from "./iStateEditMessageTextQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateEditMessageText {
  error?: any;
  query?: IStateEditMessageTextQuery;
  result?: IMessage;
}
