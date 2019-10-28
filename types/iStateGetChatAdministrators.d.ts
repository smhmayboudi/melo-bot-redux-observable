import { IStateGetChatAdministratorsQuery } from "./iStateGetChatAdministratorsQuery";
import { IChatMember } from "./telegramBot/types/iChatMember";

export interface IStateGetChatAdministrators {
  error?: any;
  query?: IStateGetChatAdministratorsQuery;
  result?: IChatMember[];
}
