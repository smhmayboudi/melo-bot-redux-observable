import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface stopMessageLiveLocation {
  (
    chat_id?: number | string,
    inline_message_id?: string,
    message_id?: number,
    reply_markup?: IInlineKeyboardMarkup,
  ): boolean | IMessage
}