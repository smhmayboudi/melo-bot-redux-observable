import { IStateSendAnimationQuery } from "../../types/iStateSendAnimationQuery";

import * as action from "./sendAnimation";

describe("sendAnimation actions", (): void => {
  const error: Error = new Error("");
  const query: IStateSendAnimationQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      sendAnimation: { error },
      type: action.SEND_ANIMATION_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      sendAnimation: { query },
      type: action.SEND_ANIMATION_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      sendAnimation: { result },
      type: action.SEND_ANIMATION_RESULT
    });
  });
});
