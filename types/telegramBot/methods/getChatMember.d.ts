import { IChatMember } from "../types/iChatMember";

export interface GetChatMember {
  (chat_id: number | string, user_id: number): IChatMember;
}
