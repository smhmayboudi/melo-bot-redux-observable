import { IStateCallbackDataFindQuery } from "../../types/iStateCallbackDataFindQuery";

import * as action from "./callbackDataFind";

describe("callbackDataFind actions", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackDataFindQuery = {
    id: "",
    pageToken: ""
  };
  const result = {};

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      callbackDataFind: { error },
      type: action.CALLBACK_DATA_FIND_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      callbackDataFind: { query },
      type: action.CALLBACK_DATA_FIND_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      callbackDataFind: { result },
      type: action.CALLBACK_DATA_FIND_RESULT
    });
  });
});
