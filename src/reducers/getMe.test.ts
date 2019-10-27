import { IStateGetMeQuery } from "../../types/iStateGetMeQuery";
import * as action from "../actions/getMe";

import * as reducer from "./getMe";

describe("getMe reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetMeQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.getMe(undefined, {
        getMe: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getMe({ ...action.initialState, query }, action.error({ error }))
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(reducer.getMe(action.initialState, action.query({ query }))).toEqual(
      { query }
    );
  });

  test("should handle result", (): void => {
    expect(
      reducer.getMe(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
