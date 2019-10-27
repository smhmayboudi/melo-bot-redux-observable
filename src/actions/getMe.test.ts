import { IStateGetMeQuery } from "../../types/iStateGetMeQuery";

import * as action from "./getMe";

describe("getMe actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetMeQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getMe: { error },
      type: action.GET_ME_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getMe: { query },
      type: action.GET_ME_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getMe: { result },
      type: action.GET_ME_RESULT
    });
  });
});
