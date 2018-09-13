import { IInputMedia } from "../types/iInputMedia";
import { IMessage } from "../types/iMessage";

export interface sendMediaGroup {
  (
    chat_id: number | string,
    media: IInputMedia[],
    disable_notification?: boolean,
    reply_to_message_id?: number,
  ): IMessage
}