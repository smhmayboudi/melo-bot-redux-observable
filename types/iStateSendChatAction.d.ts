import { IStateSendChatActionQuery } from "./iStateSendChatActionQuery";

export interface IStateSendChatAction {
  error?: any;
  query?: IStateSendChatActionQuery;
  result?: boolean;
}
