import { IStateSendVenueQuery } from "../../types/iStateSendVenueQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendVenue";

import * as reducer from "./sendVenue";

describe("sendVenue reducer", (): void => {
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
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.sendVenue(undefined, {
        sendVenue: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendVenue(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendVenue(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendVenue(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
