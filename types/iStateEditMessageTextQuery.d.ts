import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateEditMessageTextQuery {
  chat_id?: number | string;
  disable_web_page_preview?: boolean;
  inline_message_id?: string;
  message_id?: number;
  parse_mode?: string;
  reply_markup?: IInlineKeyboardMarkup;
  text: string;
}
