import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateEditMessageLiveLocationQuery {
  chat_id?: number | string;
  inline_message_id?: string;
  latitude: number;
  longitude: number;
  message_id?: number;
  reply_markup?: IInlineKeyboardMarkup;
}
