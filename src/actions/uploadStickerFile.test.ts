import * as fs from "fs";
import * as path from "path";

import { IStateUploadStickerFileQuery } from "../../types/iStateUploadStickerFileQuery";
import { IFile } from "../../types/telegramBot/types/iFile";

import * as action from "./uploadStickerFile";

describe("uploadStickerFile actions", (): void => {
  const error: Error = new Error("");
  const query: IStateUploadStickerFileQuery = {
    png_sticker: fs.createReadStream(
      path.resolve(__dirname, "../../asset", "small.png")
    ),
    user_id: 0
  };
  const result: IFile = {
    file_id: ""
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      type: action.UPLOAD_STICKER_FILE_ERROR,
      uploadStickerFile: { error }
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      type: action.UPLOAD_STICKER_FILE_QUERY,
      uploadStickerFile: { query }
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      type: action.UPLOAD_STICKER_FILE_RESULT,
      uploadStickerFile: { result }
    });
  });
});
