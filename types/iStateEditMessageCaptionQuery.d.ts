import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateEditMessageCaptionQuery {
  caption?: string;
  chat_id?: number | string;
  inline_message_id?: string;
  message_id?: number;
  parse_mode?: string;
  reply_markup?: IInlineKeyboardMarkup;
}
