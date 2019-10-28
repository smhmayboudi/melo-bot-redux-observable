import { IStateDeleteChatStickerSetQuery } from "../../types/iStateDeleteChatStickerSetQuery";

import * as action from "./deleteChatStickerSet";

describe("deleteChatStickerSet actions", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteChatStickerSetQuery = {
    chat_id: 0
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      deleteChatStickerSet: { error },
      type: action.DELETE_CHAT_STICKER_SET_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      deleteChatStickerSet: { query },
      type: action.DELETE_CHAT_STICKER_SET_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      deleteChatStickerSet: { result },
      type: action.DELETE_CHAT_STICKER_SET_RESULT
    });
  });
});
