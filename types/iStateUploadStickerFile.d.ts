import { IStateUploadStickerFileQuery } from "./iStateUploadStickerFileQuery";
import { IFile } from "./telegramBot/types/iFile";

export interface IStateUploadStickerFile {
  error?: any;
  query?: IStateUploadStickerFileQuery;
  result?: IFile;
}
