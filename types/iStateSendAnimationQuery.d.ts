import { IForceReply } from "./telegramBot/types/iForceReply";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IInputFile } from "./telegramBot/types/iInputFile";
import { IReplyKeyboardMarkup } from "./telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "./telegramBot/types/iReplyKeyboardRemove";

export interface IStateSendAnimationQuery {
  animation: IInputFile | string;
  caption?: string;
  chat_id: number | string;
  disable_notification?: boolean;
  duration?: number;
  height?: number;
  parse_mode?: string;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplyKeyboardRemove
    | IForceReply;
  reply_to_message_id?: number;
  thumb?: IInputFile | string;
  width?: number;
}
