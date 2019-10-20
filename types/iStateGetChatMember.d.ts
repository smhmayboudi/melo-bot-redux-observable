import { IChatMember } from "../types/telegramBot/types/iChatMember";

import { IStateGetChatMemberQuery } from "./iStateGetChatMemberQuery";

export interface IStateGetChatMember {
  error?: any;
  query?: IStateGetChatMemberQuery;
  result?: IChatMember;
}
