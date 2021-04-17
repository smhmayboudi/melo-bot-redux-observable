import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";

import * as action from "./inlineQuery";

describe("inlineQuery actions", (): void => {
  const error: Error = new Error("");
  const query: IStateInlineQueryQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    id: "",
    offset: "",
    query: ""
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      inlineQuery: { error },
      type: action.INLINE_QUERY_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      inlineQuery: { query },
      type: action.INLINE_QUERY_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      inlineQuery: { result },
      type: action.INLINE_QUERY_RESULT
    });
  });
});
