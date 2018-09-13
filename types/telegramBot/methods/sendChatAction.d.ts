export interface sendChatAction {
  (
    action: string,
    chat_id: number | string,
  ): boolean
}