import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";
import { IInputFile } from "../types/iInputFile";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface SendVideoNote {
  (
    chat_id: number | string,
    video_note: IInputFile | string,
    disable_notification?: boolean,
    duration?: number,
    length?: number,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number,
    thumb?: IInputFile | string
  ): IMessage;
}
