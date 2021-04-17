import { IForceReply } from "./telegramBot/types/iForceReply";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IInputFile } from "./telegramBot/types/iInputFile";
import { IReplyKeyboardMarkup } from "./telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "./telegramBot/types/iReplyKeyboardRemove";

export interface IStateSendVoiceQuery {
  caption?: string;
  chat_id: number | string;
  disable_notification?: boolean;
  duration?: number;
  parse_mode?: string;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplyKeyboardRemove
    | IForceReply;
  reply_to_message_id?: number;
  voice: IInputFile | string;
}
