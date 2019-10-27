import { IActionUploadStickerFile } from "../../types/iActionUploadStickerFile";
import { IStateUploadStickerFile } from "../../types/iStateUploadStickerFile";

const initialState: IStateUploadStickerFile = {};

const UPLOAD_STICKER_FILE_ERROR: string = "UPLOAD_STICKER_FILE_ERROR";
const UPLOAD_STICKER_FILE_QUERY: string = "UPLOAD_STICKER_FILE_QUERY";
const UPLOAD_STICKER_FILE_RESULT: string = "UPLOAD_STICKER_FILE_RESULT";

const error: (
  uploadStickerFile: IStateUploadStickerFile
) => IActionUploadStickerFile = (
  uploadStickerFile: IStateUploadStickerFile
): IActionUploadStickerFile => ({
  type: UPLOAD_STICKER_FILE_ERROR,
  uploadStickerFile: {
    error: uploadStickerFile.error
  }
});
const query: (
  uploadStickerFile: IStateUploadStickerFile
) => IActionUploadStickerFile = (
  uploadStickerFile: IStateUploadStickerFile
): IActionUploadStickerFile => ({
  type: UPLOAD_STICKER_FILE_QUERY,
  uploadStickerFile: {
    query: uploadStickerFile.query
  }
});
const result: (
  uploadStickerFile: IStateUploadStickerFile
) => IActionUploadStickerFile = (
  uploadStickerFile: IStateUploadStickerFile
): IActionUploadStickerFile => ({
  type: UPLOAD_STICKER_FILE_RESULT,
  uploadStickerFile: {
    result: uploadStickerFile.result
  }
});

export {
  initialState,
  UPLOAD_STICKER_FILE_ERROR,
  UPLOAD_STICKER_FILE_QUERY,
  UPLOAD_STICKER_FILE_RESULT,
  error,
  query,
  result
};
