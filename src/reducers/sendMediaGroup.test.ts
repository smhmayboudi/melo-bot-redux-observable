import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";
import * as action from "../actions/sendMediaGroup";

import * as reducer from "./sendMediaGroup";

describe("sendMediaGroup reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMediaGroupQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.sendMediaGroup(undefined, {
        sendMediaGroup: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendMediaGroup(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendMediaGroup(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendMediaGroup(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
