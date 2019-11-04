import { IStateCallbackDataInsertQuery } from "../../types/iStateCallbackDataInsertQuery";

import * as action from "./callbackDataInsert";

describe("callbackDataInsert actions", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackDataInsertQuery = {};
  const result = "";

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      callbackDataInsert: { error },
      type: action.CALLBACK_DATA_INSERT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      callbackDataInsert: { query },
      type: action.CALLBACK_DATA_INSERT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      callbackDataInsert: { result },
      type: action.CALLBACK_DATA_INSERT_RESULT
    });
  });
});
