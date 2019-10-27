import { IStateSendAnimationQuery } from "../../types/iStateSendAnimationQuery";
import * as action from "../actions/sendAnimation";

import * as reducer from "./sendAnimation";

describe("sendAnimation reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendAnimationQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.sendAnimation(undefined, {
        sendAnimation: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendAnimation(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendAnimation(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendAnimation(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
