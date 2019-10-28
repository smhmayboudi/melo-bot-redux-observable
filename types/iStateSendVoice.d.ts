import { IStateSendVoiceQuery } from "./iStateSendVoiceQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendVoice {
  error?: any;
  query?: IStateSendVoiceQuery;
  result?: IMessage;
}
