import { IStatePinChatMessageQuery } from "./iStatePinChatMessageQuery";

export interface IStatePinChatMessage {
  error?: any;
  query?: IStatePinChatMessageQuery;
  // TODO: check it
  result?: boolean;
}
