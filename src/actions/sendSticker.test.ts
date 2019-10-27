import { IStateSendStickerQuery } from "../../types/iStateSendStickerQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendSticker";

describe("sendSticker actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendStickerQuery = {
    chat_id: 0,
    sticker: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendSticker: { error },
      type: action.SEND_STICKER_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendSticker: { query },
      type: action.SEND_STICKER_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendSticker: { result },
      type: action.SEND_STICKER_RESULT
    });
  });
});
