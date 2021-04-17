import { IInlineKeyboardMarkup } from "./telegramBot/types/iInlineKeyboardMarkup";
import { IInputMediaAnimation } from "./telegramBot/types/iInputMediaAnimation";
import { IInputMediaAudio } from "./telegramBot/types/iInputMediaAudio";
import { IInputMediaDocument } from "./telegramBot/types/iInputMediaDocument";
import { IInputMediaPhoto } from "./telegramBot/types/iInputMediaPhoto";
import { IInputMediaVideo } from "./telegramBot/types/iInputMediaVideo";

export interface IStateEditMessageMediaQuery {
  chat_id?: number | string;
  inline_message_id?: string;
  media:
    | IInputMediaAnimation
    | IInputMediaAudio
    | IInputMediaDocument
    | IInputMediaPhoto
    | IInputMediaVideo;
  message_id?: number;
  reply_markup?: IInlineKeyboardMarkup;
}
