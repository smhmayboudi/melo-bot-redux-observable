export interface DeleteMessage {
  (chat_id: number | string, message_id: number): boolean;
}
