import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface editMessageCaption {
  (
    caption?: string,
    chat_id?: number | string,
    inline_message_id?: string,
    message_id?: number,
    parse_mode?: string,
    reply_markup?: IInlineKeyboardMarkup,
  ): IMessage
}