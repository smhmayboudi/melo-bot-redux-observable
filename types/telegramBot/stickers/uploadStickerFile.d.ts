import { IFile } from "../types/iFile";
import { IInputFile } from "../types/iInputFile";

export interface UploadStickerFile {
  (png_sticker: IInputFile, user_id: number): IFile;
}
