import { IStateSendVenueQuery } from "../../types/iStateSendVenueQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./sendVenue";

describe("sendVenue actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVenueQuery = {
    address: "",
    chat_id: 0,
    latitude: 0,
    longitude: 0,
    title: ""
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
      sendVenue: { error },
      type: action.SEND_VENUE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendVenue: { query },
      type: action.SEND_VENUE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendVenue: { result },
      type: action.SEND_VENUE_RESULT
    });
  });
});
