import { IForceReply } from "../types/telegramBot/types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/telegramBot/types/iInlineKeyboardMarkup";
import { IMessage } from "../types/telegramBot/types/iMessage";
import { IReplyKeyboardMarkup } from "../types/telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/telegramBot/types/iReplyKeyboardRemove";

export interface IStateSendMessageQuery {
  chat_id: number | string;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  parse_mode?: string;
  reply_to_message_id?: number;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplyKeyboardRemove
    | IForceReply;
  text: string;
}
