import { IActionUploadStickerFile } from "../../types/iActionUploadStickerFile";
import { IStateUploadStickerFile } from "../../types/iStateUploadStickerFile";
import * as actions from "../actions";

const uploadStickerFile: (
  state: IStateUploadStickerFile | undefined,
  action: IActionUploadStickerFile
) => IStateUploadStickerFile = (
  state: IStateUploadStickerFile | undefined = actions.uploadStickerFile
    .initialState,
  action: IActionUploadStickerFile
): IStateUploadStickerFile => {
  switch (action.type) {
    case actions.uploadStickerFile.UPLOAD_STICKER_FILE_ERROR:
      return { error: action.uploadStickerFile.error, query: state.query };
    case actions.uploadStickerFile.UPLOAD_STICKER_FILE_QUERY:
      return { query: action.uploadStickerFile.query };
    case actions.uploadStickerFile.UPLOAD_STICKER_FILE_RESULT:
      return { query: state.query, result: action.uploadStickerFile.result };
    default:
      return state;
  }
};

export { uploadStickerFile };
