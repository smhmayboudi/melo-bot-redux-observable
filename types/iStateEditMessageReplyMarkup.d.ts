import { IStateEditMessageReplyMarkupQuery } from "./iStateEditMessageReplyMarkupQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateEditMessageReplyMarkup {
  error?: any;
  query?: IStateEditMessageReplyMarkupQuery;
  result?: IMessage;
}
