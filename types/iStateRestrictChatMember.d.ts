import { IStateRestrictChatMemberQuery } from "./iStateRestrictChatMemberQuery";

export interface IStateRestrictChatMember {
  error?: any;
  query?: IStateRestrictChatMemberQuery;
  // TODO: check it
  result?: boolean;
}
