import { IStateEditMessageMediaQuery } from "./iStateEditMessageMediaQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateEditMessageMedia {
  error?: any;
  query?: IStateEditMessageMediaQuery;
  result?: boolean | IMessage;
}
