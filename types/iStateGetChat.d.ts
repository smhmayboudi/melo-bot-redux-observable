import { IStateGetChatQuery } from "./iStateGetChatQuery";

export interface IStateGetChat {
  error?: any;
  query?: IStateGetChatQuery;
  // TODO: check it
  result?: boolean;
}
