import { IStateGetStickerSetQuery } from "../../types/iStateGetStickerSetQuery";
import { IStickerSet } from "../../types/telegramBot/stickers/iStickerSet";

import * as action from "./getStickerSet";

describe("getStickerSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetStickerSetQuery = {
    name: ""
  };
  const result: IStickerSet = {
    contains_masks: false,
    is_animated: false,
    name: "",
    stickers: [
      {
        file_id: "",
        height: 0,
        is_animated: false,
        width: 0
      }
    ],
    title: ""
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getStickerSet: { error },
      type: action.GET_STICKER_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getStickerSet: { query },
      type: action.GET_STICKER_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getStickerSet: { result },
      type: action.GET_STICKER_SET_RESULT
    });
  });
});
