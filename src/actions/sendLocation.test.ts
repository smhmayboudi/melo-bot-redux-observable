import { IStateSendLocationQuery } from "../../types/iStateSendLocationQuery";

import * as action from "./sendLocation";

describe("sendLocation actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendLocationQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
