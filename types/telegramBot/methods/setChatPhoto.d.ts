import { IInputFile } from "../types/iInputFile";

export interface SetChatPhoto {
  (chat_id: number | string, photo: IInputFile): boolean;
}
