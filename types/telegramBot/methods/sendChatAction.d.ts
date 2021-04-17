export interface SendChatAction {
  (action: string, chat_id: number | string): boolean;
}
