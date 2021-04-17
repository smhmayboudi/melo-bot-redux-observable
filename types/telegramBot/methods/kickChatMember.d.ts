export interface KickChatMember {
  (user_id: number, chat_id: number | string, until_date?: number): boolean;
}
