import { IStateStopMessageLiveLocationQuery } from "../../types/iStateStopMessageLiveLocationQuery";

import * as action from "./stopMessageLiveLocation";

describe("stopMessageLiveLocation actions", (): void => {
  const error: Error = new Error("");
  const query: IStateStopMessageLiveLocationQuery = {};
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      stopMessageLiveLocation: { error },
      type: action.STOP_MESSAGE_LIVE_LOCATION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      stopMessageLiveLocation: { query },
      type: action.STOP_MESSAGE_LIVE_LOCATION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      stopMessageLiveLocation: { result },
      type: action.STOP_MESSAGE_LIVE_LOCATION_RESULT
    });
  });
});
