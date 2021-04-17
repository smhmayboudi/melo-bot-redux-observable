import { IChatPermissions } from "../types/iChatPermissions";

export interface RestrictChatMember {
  (
    chat_id: number | string,
    permissions: IChatPermissions,
    user_id: number,
    until_date?: number
  ): boolean;
}
