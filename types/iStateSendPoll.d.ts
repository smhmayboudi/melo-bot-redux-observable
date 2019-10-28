import { IStateSendPollQuery } from "./iStateSendPollQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendPoll {
  error?: any;
  query?: IStateSendPollQuery;
  result?: IMessage;
}
