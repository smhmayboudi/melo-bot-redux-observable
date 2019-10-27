import { IStateKickChatMemberQuery } from "./iStateKickChatMemberQuery";

export interface IStateKickChatMember {
  error?: any;
  query?: IStateKickChatMemberQuery;
  // TODO: check it
  result?: boolean;
}
