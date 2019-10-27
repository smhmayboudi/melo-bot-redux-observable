import * as fs from "fs";

import { IStateUploadStickerFileQuery } from "../../types/iStateUploadStickerFileQuery";
import { IFile } from "../../types/telegramBot/types/iFile";
import * as action from "../actions/uploadStickerFile";

import * as reducer from "./uploadStickerFile";

describe("uploadStickerFile reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateUploadStickerFileQuery = {
    png_sticker: fs.createReadStream("./asset/small.png"),
    user_id: 0
  };
  const result: IFile = {
    file_id: ""
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.uploadStickerFile(undefined, {
        type: "",
        uploadStickerFile: {}
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.uploadStickerFile(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.uploadStickerFile(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.uploadStickerFile(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
