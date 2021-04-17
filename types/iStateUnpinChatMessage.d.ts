import { IStateUnpinChatMessageQuery } from "./iStateUnpinChatMessageQuery";

export interface IStateUnpinChatMessage {
  error?: any;
  query?: IStateUnpinChatMessageQuery;
  result?: boolean;
}
