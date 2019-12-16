import { IAction } from "./iAction";
import { IStateUploadStickerFile } from "./iStateUploadStickerFile";

export interface IActionUploadStickerFile extends IAction {
  uploadStickerFile: IStateUploadStickerFile;
}
