import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";

export interface StopPoll {
  (
    chat_id: number | string,
    message_id: number,
    reply_markup?: IInlineKeyboardMarkup
  ): boolean;
}
