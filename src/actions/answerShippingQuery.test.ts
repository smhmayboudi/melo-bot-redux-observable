import { IStateAnswerShippingQueryQuery } from "../../types/iStateAnswerShippingQueryQuery";

import * as action from "./answerShippingQuery";

describe("answerShippingQuery actions", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerShippingQueryQuery = {
    error_message: "",
    ok: false,
    shipping_options: [
      {
        id: "",
        prices: [
          {
            amount: 0,
            label: ""
          }
        ],
        title: ""
      }
    ],
    shipping_query_id: ""
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      answerShippingQuery: { error },
      type: action.ANSWER_SHIPPING_QUERY_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      answerShippingQuery: { query },
      type: action.ANSWER_SHIPPING_QUERY_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      answerShippingQuery: { result },
      type: action.ANSWER_SHIPPING_QUERY_RESULT
    });
  });
});
