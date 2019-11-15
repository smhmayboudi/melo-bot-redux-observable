import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";

import * as action from "./callbackQueryDataFind";

describe("callbackQueryDataFind actions", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataFindQuery = {
    id: "",
    pageToken: ""
  };
  const result: IStateCallbackQueryDataInsertQuery | null = {};

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      callbackQueryDataFind: { error },
      type: action.CALLBACK_QUERY_DATA_FIND_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      callbackQueryDataFind: { query },
      type: action.CALLBACK_QUERY_DATA_FIND_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      callbackQueryDataFind: { result },
      type: action.CALLBACK_QUERY_DATA_FIND_RESULT
    });
  });
});
