import { IStateUnbanChatMemberQuery } from "./iStateUnbanChatMemberQuery";

export interface IStateUnbanChatMember {
  error?: any;
  query?: IStateUnbanChatMemberQuery;
  // TODO: check it
  result?: boolean;
}
