import { IStateGetStickerSetQuery } from "../../types/iStateGetStickerSetQuery";
import { IStickerSet } from "../../types/telegramBot/stickers/iStickerSet";
import * as action from "../actions/getStickerSet";

import * as reducer from "./getStickerSet";

describe("getStickerSet reducer", (): void => {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.getStickerSet(undefined, {
        getStickerSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getStickerSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getStickerSet(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getStickerSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
