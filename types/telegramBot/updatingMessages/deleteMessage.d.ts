export interface deleteMessage {
  (chat_id: number | string, message_id: number): boolean;
}
