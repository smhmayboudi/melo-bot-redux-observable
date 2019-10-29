import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface sendMessage {
  (
    chat_id: number | string,
    text: string,
    disable_web_page_preview?: boolean,
    disable_notification?: boolean,
    parse_mode?: string,
    reply_to_message_id?: number,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply
  ): IMessage;
}
