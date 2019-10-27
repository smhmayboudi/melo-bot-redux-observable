import { IStateGetChatMembersCountQuery } from "./iStateGetChatMembersCountQuery";

export interface IStateGetChatMembersCount {
  error?: any;
  query?: IStateGetChatMembersCountQuery;
  // TODO: check it
  result?: boolean;
}
