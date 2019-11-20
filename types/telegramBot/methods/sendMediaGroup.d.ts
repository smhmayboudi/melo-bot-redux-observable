import { IInputMediaAnimation } from "../types/iInputMediaAnimation";
import { IInputMediaAudio } from "../types/iInputMediaAudio";
import { IInputMediaDocument } from "../types/iInputMediaDocument";
import { IInputMediaPhoto } from "../types/iInputMediaPhoto";
import { IInputMediaVideo } from "../types/iInputMediaVideo";
import { IMessage } from "../types/iMessage";

export interface SendMediaGroup {
  (
    chat_id: number | string,
    media: Array<
      | IInputMediaAnimation
      | IInputMediaAudio
      | IInputMediaDocument
      | IInputMediaPhoto
      | IInputMediaVideo
    >,
    disable_notification?: boolean,
    reply_to_message_id?: number
  ): IMessage;
}
