import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";

export interface stopPoll {
    (
      chat_id: number | string,
      message_id: number,
      reply_markup?: IInlineKeyboardMarkup
    ): boolean
  }
  