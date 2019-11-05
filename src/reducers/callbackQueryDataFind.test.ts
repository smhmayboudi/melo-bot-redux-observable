import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import * as action from "../actions/callbackQueryDataFind";

import * as reducer from "./callbackQueryDataFind";

describe("callbackQueryDataFind reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataFindQuery = {
    id: "",
    pageToken: ""
  };
  const result = {};

  test("should handle initialState", (): void => {
    expect(
      reducer.callbackQueryDataFind(undefined, {
        callbackQueryDataFind: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.callbackQueryDataFind(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.callbackQueryDataFind(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.callbackQueryDataFind(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
