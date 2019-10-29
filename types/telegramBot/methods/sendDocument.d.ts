import { IForceReply } from "../types/iForceReply";
import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInputFile } from "../types/iInputFile";
import { IMessage } from "../types/iMessage";
import { IReplyKeyboardMarkup } from "../types/iReplyKeyboardMarkup";
import { IReplyKeyboardRemove } from "../types/iReplyKeyboardRemove";

export interface sendDocument {
  (
    chat_id: number | string,
    document: IInputFile | string,
    caption?: string,
    disable_notification?: boolean,
    parse_mode?: string,
    reply_markup?:
      | IInlineKeyboardMarkup
      | IReplyKeyboardMarkup
      | IReplyKeyboardRemove
      | IForceReply,
    reply_to_message_id?: number,
    thumb?: IInputFile | string
  ): IMessage;
}
