import { IStateSendLocationQuery } from "../../types/iStateSendLocationQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendLocation";

describe("sendLocation actions", (): void => {
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

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendLocation: { error },
      type: action.SEND_LOCATION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendLocation: { query },
      type: action.SEND_LOCATION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendLocation: { result },
      type: action.SEND_LOCATION_RESULT
    });
  });
});
