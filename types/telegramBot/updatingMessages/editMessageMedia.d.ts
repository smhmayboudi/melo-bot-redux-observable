import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInputMedia } from "../types/iInputMedia";
import { IMessage } from "../types/iMessage";
export interface editMessageMedia {
  (
    media: IInputMedia,
    reply_markup: IInlineKeyboardMarkup,
    chat_id?: number | string,
    inline_message_id?: string,
    message_id?: number,
  ): IMessage
}