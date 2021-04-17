import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";

export interface IStateStopPollQuery {
  chat_id: number | string;
  message_id: number;
  reply_markup?: IInlineKeyboardMarkup;
}
