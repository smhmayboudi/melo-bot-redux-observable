import { IStatePinChatMessageQuery } from "./iStatePinChatMessageQuery";

export interface IStatePinChatMessage {
  error?: any;
  query?: IStatePinChatMessageQuery;
  result?: boolean;
}
