import { IStateGetFileQuery } from "../../types/iStateGetFileQuery";

import * as action from "./getFile";

describe("getFile actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetFileQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getFile: { error },
      type: action.GET_FILE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getFile: { query },
      type: action.GET_FILE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getFile: { result },
      type: action.GET_FILE_RESULT
    });
  });
});
