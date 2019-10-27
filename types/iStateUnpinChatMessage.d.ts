import { IStateUnpinChatMessageQuery } from "./iStateUnpinChatMessageQuery";

export interface IStateUnpinChatMessage {
  error?: any;
  query?: IStateUnpinChatMessageQuery;
  // TODO: check it
  result?: boolean;
}
