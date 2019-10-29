import { IChatMember } from "../types/iChatMember";

export interface getChatMember {
  (chat_id: number | string, user_id: number): IChatMember;
}
