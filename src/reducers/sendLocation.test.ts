import { IStateSendLocationQuery } from "../../types/iStateSendLocationQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendLocation";

import * as reducer from "./sendLocation";

describe("sendLocation reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendLocationQuery = {
    chat_id: 0,
    latitude: 0,
    longitude: 0
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
      reducer.sendLocation(undefined, {
        sendLocation: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendLocation(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendLocation(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendLocation(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
