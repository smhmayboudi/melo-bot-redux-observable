import { IStateAnswerPreCheckoutQueryQuery } from "../../types/iStateAnswerPreCheckoutQueryQuery";

import * as action from "./answerPreCheckoutQuery";

describe("answerPreCheckoutQuery actions", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerPreCheckoutQueryQuery = {
    ok: false,
    pre_checkout_query_id: ""
  };
  const result = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      answerPreCheckoutQuery: { error },
      type: action.ANSWER_PRE_CHECKOUT_QUERY_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      answerPreCheckoutQuery: { query },
      type: action.ANSWER_PRE_CHECKOUT_QUERY_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      answerPreCheckoutQuery: { result },
      type: action.ANSWER_PRE_CHECKOUT_QUERY_RESULT
    });
  });
});
