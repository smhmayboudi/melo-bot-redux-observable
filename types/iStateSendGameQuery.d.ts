import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateSendGameQuery {
  chat_id: number;
  disable_notification?: boolean;
  game_short_name: string;
  reply_markup?: IInlineKeyboardMarkup;
  reply_to_message_id?: number;
}
