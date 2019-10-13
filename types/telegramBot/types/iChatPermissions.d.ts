import { IChatPermissions } from "../types/iChatPermissions";

export interface IChatPermissions {
  chat_id: number | string,
  permissions: IChatPermissions,
}