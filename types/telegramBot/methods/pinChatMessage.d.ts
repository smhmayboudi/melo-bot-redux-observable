export interface pinChatMessage {
  (
    chat_id: number | string,
    message_id: number,
    disable_notification?: boolean
  ): boolean;
}
