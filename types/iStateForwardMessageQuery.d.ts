export interface IStateForwardMessageQuery {
  chat_id: number | string;
  disable_notification?: boolean;
  from_chat_id: number | string;
  message_id: number;
}
