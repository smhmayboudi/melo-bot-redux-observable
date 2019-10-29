import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";
import { IUser } from "../types/iUser";

export interface getMe {
  (
    chat_id: number | string,
    text: string,
    disable_notification?: boolean,
    disable_web_page_preview?: boolean,
    parse_mode?: string,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number
  ): IUser;
}
