import { IStateSendAnimationQuery } from "./iStateSendAnimationQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendAnimation {
  error?: any;
  query?: IStateSendAnimationQuery;
  result?: IMessage;
}
