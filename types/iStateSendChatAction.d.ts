import { IStateSendChatActionQuery } from "./iStateSendChatActionQuery";

export interface IStateSendChatAction {
  error?: any;
  query?: IStateSendChatActionQuery;
  // TODO: check it
  result?: boolean;
}
