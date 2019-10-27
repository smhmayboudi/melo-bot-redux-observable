import { IStateEditMessageCaptionQuery } from "./iStateEditMessageCaptionQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateEditMessageCaption {
  error?: any;
  query?: IStateEditMessageCaptionQuery;
  result?: IMessage;
}
