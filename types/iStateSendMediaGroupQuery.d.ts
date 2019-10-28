import { IInputMedia } from "./telegramBot/types/iInputMedia";

export interface IStateSendMediaGroupQuery {
  chat_id: number | string;
  disable_notification?: boolean;
  media: IInputMedia[];
  reply_to_message_id?: number;
}
