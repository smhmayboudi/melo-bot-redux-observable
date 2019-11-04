import { IStateCallbackDataInsertQuery } from "../../types/iStateCallbackDataInsertQuery";
import * as action from "../actions/callbackDataInsert";

import * as reducer from "./callbackDataInsert";

describe("callbackDataInsert reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackDataInsertQuery = {};
  const result = "";

  test("should handle initialState", (): void => {
    expect(
      reducer.callbackDataInsert(undefined, {
        callbackDataInsert: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.callbackDataInsert(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.callbackDataInsert(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.callbackDataInsert(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
