import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInputFile } from "../types/iInputFile";
import { IMessage } from "../types/iMessage";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface sendAudio {
  (
    audio: IInputFile | string,
    chat_id: number | string,
    caption?: string,
    disable_notification?: boolean,
    duration?: number,
    parse_mode?: string,
    performer?: string,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number,
    thumb?: IInputFile | string,
    title?: string,
  ): IMessage
}