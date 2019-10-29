import { IStateSetChatStickerSetQuery } from "../../types/iStateSetChatStickerSetQuery";

import * as action from "./setChatStickerSet";

describe("setChatStickerSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatStickerSetQuery = {
    chat_id: 0,
    sticker_set_name: ""
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setChatStickerSet: { error },
      type: action.SET_CHAT_STICKER_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setChatStickerSet: { query },
      type: action.SET_CHAT_STICKER_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setChatStickerSet: { result },
      type: action.SET_CHAT_STICKER_SET_RESULT
    });
  });
});
