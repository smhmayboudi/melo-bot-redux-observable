import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IInputMediaAnimation } from "../types/iInputMediaAnimation";
import { IInputMediaAudio } from "../types/iInputMediaAudio";
import { IInputMediaDocument } from "../types/iInputMediaDocument";
import { IInputMediaPhoto } from "../types/iInputMediaPhoto";
import { IInputMediaVideo } from "../types/iInputMediaVideo";
import { IMessage } from "../types/iMessage";

export interface EditMessageMedia {
  (
    media:
      | IInputMediaAnimation
      | IInputMediaAudio
      | IInputMediaDocument
      | IInputMediaPhoto
      | IInputMediaVideo,
    chat_id?: number | string,
    inline_message_id?: string,
    message_id?: number,
    reply_markup?: IInlineKeyboardMarkup
  ): IMessage;
}
