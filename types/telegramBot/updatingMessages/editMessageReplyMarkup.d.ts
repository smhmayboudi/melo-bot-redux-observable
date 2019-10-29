import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface editMessageReplyMarkup {
  (
    chat_id?: number | string,
    inline_message_id?: string,
    message_id?: number,
    reply_markup?: IInlineKeyboardMarkup
  ): IMessage;
}
