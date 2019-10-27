import { IStateForwardMessageQuery } from "../../types/iStateForwardMessageQuery";
import * as action from "../actions/forwardMessage";

import * as reducer from "./forwardMessage";

describe("forwardMessage reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateForwardMessageQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.forwardMessage(undefined, {
        forwardMessage: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.forwardMessage(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.forwardMessage(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.forwardMessage(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
