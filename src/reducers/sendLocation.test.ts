import { IStateSendLocationQuery } from "../../types/iStateSendLocationQuery";
import * as action from "../actions/sendLocation";

import * as reducer from "./sendLocation";

describe("sendLocation reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendLocationQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
