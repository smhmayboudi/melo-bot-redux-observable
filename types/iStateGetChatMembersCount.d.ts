import { IStateGetChatMembersCountQuery } from "./iStateGetChatMembersCountQuery";

export interface IStateGetChatMembersCount {
  error?: any;
  query?: IStateGetChatMembersCountQuery;
  result?: number;
}
