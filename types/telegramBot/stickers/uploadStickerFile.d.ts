import { IFile } from "../types/iFile";
import { IInputFile } from "../types/iInputFile";

export interface uploadStickerFile {
  (
    png_sticker: IInputFile,
    user_id: number,
  ): IFile
}