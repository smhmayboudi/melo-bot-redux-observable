import * as fs from "fs";

import { IStateUploadStickerFileQuery } from "../../types/iStateUploadStickerFileQuery";
import { IFile } from "../../types/telegramBot/types/iFile";

import * as action from "./uploadStickerFile";

describe("uploadStickerFile actions", (): void => {
  const error: Error = new Error("");
  const query: IStateUploadStickerFileQuery = {
    png_sticker: fs.createReadStream("./asset/small.png"),
    user_id: 0
  };
  const result: IFile = {
    file_id: ""
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      uploadStickerFile: { error },
      type: action.UPLOAD_STICKER_FILE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      uploadStickerFile: { query },
      type: action.UPLOAD_STICKER_FILE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      uploadStickerFile: { result },
      type: action.UPLOAD_STICKER_FILE_RESULT
    });
  });
});
