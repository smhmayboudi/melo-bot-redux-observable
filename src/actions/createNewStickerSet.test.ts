import { IStateCreateNewStickerSetQuery } from "../../types/iStateCreateNewStickerSetQuery";

import * as action from "./createNewStickerSet";

describe("createNewStickerSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateCreateNewStickerSetQuery = {
    emojis: "",
    name: "",
    png_sticker: "",
    title: "",
    user_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      createNewStickerSet: { error },
      type: action.CREATE_NEW_STICKER_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      createNewStickerSet: { query },
      type: action.CREATE_NEW_STICKER_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      createNewStickerSet: { result },
      type: action.CREATE_NEW_STICKER_SET_RESULT
    });
  });
});
