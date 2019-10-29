import { IChatPermissions } from "../types/iChatPermissions";

export interface restrictChatMember {
  (
    chat_id: number | string,
    permissions: IChatPermissions,
    user_id: number,
    until_date?: number
  ): boolean;
}
