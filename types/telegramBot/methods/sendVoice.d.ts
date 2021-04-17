import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";
import { IInputFile } from "../types/iInputFile";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface SendVoice {
  (
    chat_id: number | string,
    voice: IInputFile | string,
    caption?: string,
    disable_notification?: boolean,
    duration?: number,
    parse_mode?: string,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number
  ): IMessage;
}
