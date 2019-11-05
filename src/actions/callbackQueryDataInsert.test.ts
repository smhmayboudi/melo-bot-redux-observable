import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";

import * as action from "./callbackQueryDataInsert";

describe("callbackQueryDataInsert actions", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataInsertQuery = {};
  const result = "";

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      callbackQueryDataInsert: { error },
      type: action.CALLBACK_QUERY_DATA_INSERT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      callbackQueryDataInsert: { query },
      type: action.CALLBACK_QUERY_DATA_INSERT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      callbackQueryDataInsert: { result },
      type: action.CALLBACK_QUERY_DATA_INSERT_RESULT
    });
  });
});
