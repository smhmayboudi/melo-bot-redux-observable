import { IStateAnswerInlineQueryQuery } from "../../types/iStateAnswerInlineQueryQuery";

import * as action from "./answerInlineQuery";

describe("getChatMember actions", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerInlineQueryQuery = {
    cache_time: 0,
    inline_query_id: "",
    results: []
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getChatMember: { error },
      type: action.ANSWER_INLINE_QUERY_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getChatMember: { query },
      type: action.ANSWER_INLINE_QUERY_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getChatMember: { result },
      type: action.ANSWER_INLINE_QUERY_RESULT
    });
  });
});
