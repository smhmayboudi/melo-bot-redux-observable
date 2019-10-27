import { IStateGetFileQuery } from "../../types/iStateGetFileQuery";
import * as action from "../actions/getFile";

import * as reducer from "./getFile";

describe("getFile reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetFileQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.getFile(undefined, {
        getFile: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getFile(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getFile(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getFile(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
