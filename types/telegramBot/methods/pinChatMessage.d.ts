export interface PinChatMessage {
  (
    chat_id: number | string,
    message_id: number,
    disable_notification?: boolean
  ): boolean;
}
