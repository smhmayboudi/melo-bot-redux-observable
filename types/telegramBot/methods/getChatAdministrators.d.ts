import { IChatMember } from "../types/iChatMember";

export interface getChatAdministrators {
  (
    chat_id: number | string,
  ): IChatMember[]
}