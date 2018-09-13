import { IForceReply } from "./telegramBot/types/iForceReply";
import { IInputFile } from "./telegramBot/types/iInputFile";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IMessage } from "./telegramBot/types/iMessage";
import { IReplyKeyboardMarkup } from "./telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "./telegramBot/types/iReplyKeyboardRemove";

export interface IStateSendAudioQuery {
  audio: IInputFile | string;
  caption?: string;
  chat_id: number | string;
  disable_notification?: boolean;
  duration?: number;
  parse_mode?: string;
  performer?: string;
  reply_markup?:
  | IInlineKeyboardMarkup
  | IReplyKeyboardMarkup
  | IReplyKeyboardRemove
  | IForceReply;
  reply_to_message_id?: number;
  thumb?: IInputFile | string;
  title?: string;
}