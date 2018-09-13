import * as action from "../actions/literate";
import * as reducer from "./literate";

describe("literate reducer", (): void => {

  const error: Error = new Error("");
  const query: string = "";
  const result: string = "";

  test("should handle initialState", (): void => {
    expect(reducer.literate(undefined, { literate: {}, type: "" }))
      .toEqual(action.initalState);
  });

  test("should handle error", (): void => {
    expect(reducer.literate({ ...action.initalState, query }, action.error({ error })))
      .toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(reducer.literate(action.initalState, action.query({ query })))
      .toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(reducer.literate({ ...action.initalState, query }, action.result({ result })))
      .toEqual({ query, result });
  });

});
