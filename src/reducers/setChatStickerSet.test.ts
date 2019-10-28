import { IStateSetChatStickerSetQuery } from "../../types/iStateSetChatStickerSetQuery";
import * as action from "../actions/setChatStickerSet";

import * as reducer from "./setChatStickerSet";

describe("setChatStickerSet reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatStickerSetQuery = {
    chat_id: 0,
    sticker_set_name: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.setChatStickerSet(undefined, {
        setChatStickerSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setChatStickerSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setChatStickerSet(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setChatStickerSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
