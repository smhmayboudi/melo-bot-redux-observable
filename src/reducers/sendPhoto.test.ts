import { IStateSendPhotoQuery } from "../../types/iStateSendPhotoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendPhoto";

import * as reducer from "./sendPhoto";

describe("sendPhoto reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPhotoQuery = {
    chat_id: 0,
    photo: ""
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
      reducer.sendPhoto(undefined, {
        sendPhoto: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendPhoto(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendPhoto(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendPhoto(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
