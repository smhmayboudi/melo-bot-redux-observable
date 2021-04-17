import { IForceReply } from "./telegramBot/types/iForceReply";
import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IInputFile } from "./telegramBot/types/iInputFile";
import { IReplyKeyboardMarkup } from "./telegramBot/types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "./telegramBot/types/iReplyKeyboardRemove";

export interface IStateSendStickerQuery {
  chat_id: number | string;
  disable_notification?: boolean;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplyKeyboardRemove
    | IForceReply;
  reply_to_message_id?: number;
  sticker: IInputFile | string;
}
