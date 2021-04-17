import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface EditMessageText {
  (
    text: string,
    chat_id?: number | string,
    disable_web_page_preview?: boolean,
    inline_message_id?: string,
    message_id?: number,
    parse_mode?: string,
    reply_markup?: IInlineKeyboardMarkup
  ): IMessage;
}
