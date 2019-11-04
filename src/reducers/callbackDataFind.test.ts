import { IStateCallbackDataFindQuery } from "../../types/iStateCallbackDataFindQuery";
import * as action from "../actions/callbackDataFind";

import * as reducer from "./callbackDataFind";

describe("callbackDataFind reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackDataFindQuery = {
    id: "",
    pageToken: ""
  };
  const result = {};

  test("should handle initialState", (): void => {
    expect(
      reducer.callbackDataFind(undefined, {
        callbackDataFind: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.callbackDataFind(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.callbackDataFind(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.callbackDataFind(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
