import { IInputFile } from "../types/iInputFile";

export interface setChatPhoto {
  (chat_id: number | string, photo: IInputFile): boolean;
}
