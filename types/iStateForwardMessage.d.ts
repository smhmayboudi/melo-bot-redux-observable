import { IStateForwardMessageQuery } from "./iStateForwardMessageQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateForwardMessage {
  error?: any;
  query?: IStateForwardMessageQuery;
  result?: IMessage;
}
