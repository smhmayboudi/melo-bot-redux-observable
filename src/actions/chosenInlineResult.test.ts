import { IStateChosenInlineResultQuery } from "../../types/iStateChosenInlineResultQuery";

import * as action from "./chosenInlineResult";

describe("chosenInlineResult actions", (): void => {
  const error: Error = new Error("");
  const query: IStateChosenInlineResultQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false
    },
    query: "",
    result_id: ""
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      chosenInlineResult: { error },
      type: action.CHOSEN_INLINE_RESULT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      chosenInlineResult: { query },
      type: action.CHOSEN_INLINE_RESULT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      chosenInlineResult: { result },
      type: action.CHOSEN_INLINE_RESULT_RESULT
    });
  });
});
