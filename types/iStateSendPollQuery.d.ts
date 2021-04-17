import { IForceReply } from "./telegramBot/types/iForceReply";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IReplyKeyboardMarkup } from "./telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "./telegramBot/types/iReplyKeyboardRemove";

export interface IStateSendPollQuery {
  chat_id: number | string;
  disable_notification?: boolean;
  options: string[];
  question: string;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplyKeyboardRemove
    | IForceReply;
  reply_to_message_id?: number;
}
