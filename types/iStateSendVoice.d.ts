import { IStateSendVoiceQuery } from "./iStateSendVoiceQuery";

export interface IStateSendVoice {
  error?: any;
  query?: IStateSendVoiceQuery;
  // TODO: check it
  result?: boolean;
}
