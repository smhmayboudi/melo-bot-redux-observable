import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IInputMedia } from "./telegramBot/types/iInputMedia";

export interface IStateEditMessageMediaQuery {
  chat_id?: number | string;
  inline_message_id?: string;
  media: IInputMedia;
  message_id?: number;
  reply_markup: IInlineKeyboardMarkup;
}
