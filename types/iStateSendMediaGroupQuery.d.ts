import { IInputMediaAnimation } from "./telegramBot/types/iInputMediaAnimation";
import { IInputMediaAudio } from "./telegramBot/types/iInputMediaAudio";
import { IInputMediaDocument } from "./telegramBot/types/iInputMediaDocument";
import { IInputMediaPhoto } from "./telegramBot/types/iInputMediaPhoto";
import { IInputMediaVideo } from "./telegramBot/types/iInputMediaVideo";

export interface IStateSendMediaGroupQuery {
  chat_id: number | string;
  disable_notification?: boolean;
  media: Array<IInputMediaPhoto | IInputMediaVideo>;
  reply_to_message_id?: number;
}
