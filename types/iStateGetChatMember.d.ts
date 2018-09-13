import { IStateGetChatMemberQuery } from "./iStateGetChatMemberQuery";
import { IChatMember } from "../types/telegramBot/types/iChatMember";

export interface IStateGetChatMember {
  error?: any;
  query?: IStateGetChatMemberQuery;
  result?: IChatMember;
}