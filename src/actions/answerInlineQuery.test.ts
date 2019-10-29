import { IStateAnswerInlineQueryQuery } from "../../types/iStateAnswerInlineQueryQuery";

import * as action from "./answerInlineQuery";

describe("answerInlineQuery actions", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerInlineQueryQuery = {
    inline_query_id: "",
    results: []
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      answerInlineQuery: { error },
      type: action.ANSWER_INLINE_QUERY_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      answerInlineQuery: { query },
      type: action.ANSWER_INLINE_QUERY_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      answerInlineQuery: { result },
      type: action.ANSWER_INLINE_QUERY_RESULT
    });
  });
});
