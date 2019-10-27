import { Action } from "redux";

import { IStateUploadStickerFile } from "./iStateUploadStickerFile";

export interface IActionUploadStickerFile extends Action<string> {
  uploadStickerFile: IStateUploadStickerFile;
}
