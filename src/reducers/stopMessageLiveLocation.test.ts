import { IStateStopMessageLiveLocationQuery } from "../../types/iStateStopMessageLiveLocationQuery";
import * as action from "../actions/stopMessageLiveLocation";

import * as reducer from "./stopMessageLiveLocation";

describe("stopMessageLiveLocation reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateStopMessageLiveLocationQuery = {};
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.stopMessageLiveLocation(undefined, {
        stopMessageLiveLocation: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.stopMessageLiveLocation(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.stopMessageLiveLocation(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.stopMessageLiveLocation(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
