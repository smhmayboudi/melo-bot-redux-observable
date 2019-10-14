import * as action from "./literate";

describe("literate actions", (): void => {
  const error: Error = new Error("");
  const query: string = "";
  const result: string = "";

  test("should hanle error", (): void => {
    expect(action.error({ error })).toEqual({
      literate: { error },
      type: action.LITERATE_ERROR
    });
  });

  test("should hanle query", (): void => {
    expect(action.query({ query })).toEqual({
      literate: { query },
      type: action.LITERATE_QUERY
    });
  });

  test("should hanle result", (): void => {
    expect(action.result({ result })).toEqual({
      literate: { result },
      type: action.LITERATE_RESULT
    });
  });
});
