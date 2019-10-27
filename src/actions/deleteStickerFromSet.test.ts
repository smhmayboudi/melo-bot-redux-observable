import { IStateDeleteStickerFromSetQuery } from "../../types/iStateDeleteStickerFromSetQuery";

import * as action from "./deleteStickerFromSet";

describe("deleteStickerFromSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteStickerFromSetQuery = {
    sticker: ""
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      deleteStickerFromSet: { error },
      type: action.DELETE_STICKER_FROM_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      deleteStickerFromSet: { query },
      type: action.DELETE_STICKER_FROM_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      deleteStickerFromSet: { result },
      type: action.DELETE_STICKER_FROM_SET_RESULT
    });
  });
});
