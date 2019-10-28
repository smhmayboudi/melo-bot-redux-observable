import { IStateEditMessageLiveLocationQuery } from "./iStateEditMessageLiveLocationQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateEditMessageLiveLocation {
  error?: any;
  query?: IStateEditMessageLiveLocationQuery;
  result?: boolean | IMessage;
}
