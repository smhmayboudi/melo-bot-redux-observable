import { IStateSendStickerQuery } from "../../types/iStateSendStickerQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendSticker";

import * as reducer from "./sendSticker";

describe("sendSticker reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendStickerQuery = {
    chat_id: 0,
    sticker: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.sendSticker(undefined, {
        sendSticker: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendSticker(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendSticker(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendSticker(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
