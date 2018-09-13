import { IGameHighScore } from "./iGameHighScore";

export interface getGameHighScores {
  (
    user_id: number,
    chat_id?: number,
    inline_message_id?: string,
    message_id?: number,
  ): IGameHighScore[]
}