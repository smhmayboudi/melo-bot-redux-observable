import { IMessage } from "../types/iMessage";

export interface setGameScore {
  (
    score: number,
    user_id: number,
    chat_id?: number,
    disable_edit_message?: boolean,
    force?: boolean,
    inline_message_id?: string,
    message_id?: number,
  ): IMessage
}