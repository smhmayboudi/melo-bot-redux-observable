import { IStateSendVenueQuery } from "../../types/iStateSendVenueQuery";

import * as action from "./sendVenue";

describe("sendVenue actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVenueQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
