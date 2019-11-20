import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface EditMessageLiveLocation {
  (
    latitude: number,
    longitude: number,
    chat_id?: number | string,
    inline_message_id?: string,
    message_id?: number,
    reply_markup?: IInlineKeyboardMarkup
  ): boolean | IMessage;
}
