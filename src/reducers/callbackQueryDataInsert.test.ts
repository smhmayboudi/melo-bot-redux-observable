import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as action from "../actions/callbackQueryDataInsert";

import * as reducer from "./callbackQueryDataInsert";

describe("callbackQueryDataInsert reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataInsertQuery = {};
  const result = "";

  test("should handle initialState", (): void => {
    expect(
      reducer.callbackQueryDataInsert(undefined, {
        callbackQueryDataInsert: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.callbackQueryDataInsert(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.callbackQueryDataInsert(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.callbackQueryDataInsert(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
