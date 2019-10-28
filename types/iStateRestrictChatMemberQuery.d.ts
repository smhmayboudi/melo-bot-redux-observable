import { IChatPermissions } from "./telegramBot/types/iChatPermissions";

export interface IStateRestrictChatMemberQuery {
  chat_id: number | string;
  permissions: IChatPermissions;
  until_date?: number;
  user_id: number;
}
