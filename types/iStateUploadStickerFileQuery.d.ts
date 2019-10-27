import { IInputFile } from "./telegramBot/types/iInputFile";

export interface IStateUploadStickerFileQuery {
  png_sticker: IInputFile;
  user_id: number;
}
