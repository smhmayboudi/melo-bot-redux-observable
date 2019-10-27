import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateEditMessageReplyMarkupQuery {
  chat_id?: number | string;
  inline_message_id?: string;
  message_id?: number;
  reply_markup?: IInlineKeyboardMarkup;
}
