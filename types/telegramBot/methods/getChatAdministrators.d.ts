import { IChatMember } from "../types/iChatMember";

export interface GetChatAdministrators {
  (chat_id: number | string): IChatMember[];
}
