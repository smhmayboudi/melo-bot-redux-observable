import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInputFile } from "../types/iInputFile";
import { IMessage } from "../types/iMessage";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface SendSticker {
  (
    chat_id: number | string,
    sticker: IInputFile | string,
    disable_notification?: boolean,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number
  ): IMessage;
}
