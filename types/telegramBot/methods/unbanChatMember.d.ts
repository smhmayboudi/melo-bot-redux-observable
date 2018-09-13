export interface unbanChatMember {
  (
    chat_id: number | string,
    user_id: number,
  ): boolean
}