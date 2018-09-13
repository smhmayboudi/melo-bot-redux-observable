import { IStateSendAudioQuery } from "./iStateSendAudioQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendAudio {
  error?: any;
  query?: IStateSendAudioQuery;
  result?: IMessage;
}