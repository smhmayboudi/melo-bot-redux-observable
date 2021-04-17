import { IStateAddStickerToSetQuery } from "../../types/iStateAddStickerToSetQuery";

import * as action from "./addStickerToSet";

describe("addStickerToSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateAddStickerToSetQuery = {
    emojis: "",
    name: "",
    png_sticker: "",
    user_id: 0
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      addStickerToSet: { error },
      type: action.ADD_STICKER_TO_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      addStickerToSet: { query },
      type: action.ADD_STICKER_TO_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      addStickerToSet: { result },
      type: action.ADD_STICKER_TO_SET_RESULT
    });
  });
});
