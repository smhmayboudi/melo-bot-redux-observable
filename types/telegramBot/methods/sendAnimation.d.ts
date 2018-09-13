import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInputFile } from "../types/iInputFile";
import { IMessage } from "../types/iMessage";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface sendAnimation {
  (
    animation: IInputFile | string,
    chat_id: number | string,
    thumb?: IInputFile | string,
    caption?: string,
    disable_notification?: boolean,
    duration?: number,
    height?: number,
    parse_mode?: string,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number,
    width?: number,
  ): IMessage
}