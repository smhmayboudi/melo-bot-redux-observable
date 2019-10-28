import { IStateDeleteChatStickerSetQuery } from "../../types/iStateDeleteChatStickerSetQuery";
import * as action from "../actions/deleteChatStickerSet";

import * as reducer from "./deleteChatStickerSet";

describe("deleteChatStickerSet reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteChatStickerSetQuery = {
    chat_id: 0
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.deleteChatStickerSet(undefined, {
        deleteChatStickerSet: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.deleteChatStickerSet(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.deleteChatStickerSet(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.deleteChatStickerSet(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
