import { IStateSendAudioQuery } from "./iStateSendAudioQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendAudio {
  error?: Error;
  query?: IStateSendAudioQuery;
  result?: IMessage;
}
