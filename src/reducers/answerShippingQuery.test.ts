import { IStateAnswerShippingQueryQuery } from "../../types/iStateAnswerShippingQueryQuery";
import * as action from "../actions/answerShippingQuery";

import * as reducer from "./answerShippingQuery";

describe("answerShippingQuery reducer", (): void => {
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
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.answerShippingQuery(undefined, {
        answerShippingQuery: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.answerShippingQuery(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.answerShippingQuery(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.answerShippingQuery(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
