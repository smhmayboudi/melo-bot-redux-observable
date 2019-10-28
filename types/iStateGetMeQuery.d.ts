import { IForceReply } from "./telegramBot/types/iForceReply";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IReplyKeyboardMarkup } from "./telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "./telegramBot/types/iReplyKeyboardRemove";

export interface IStateGetMeQuery {
  chat_id: number | string;
  disable_notification?: boolean;
  disable_web_page_preview?: boolean;
  parse_mode?: string;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplyKeyboardRemove
    | IForceReply;
  reply_to_message_id?: number;
  text: string;
}
