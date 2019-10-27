import { IStateAnswerPreCheckoutQueryQuery } from "../../types/iStateAnswerPreCheckoutQueryQuery";
import * as action from "../actions/answerPreCheckoutQuery";

import * as reducer from "./answerPreCheckoutQuery";

describe("answerPreCheckoutQuery reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerPreCheckoutQueryQuery = {
    pre_checkout_query_id: "",
    ok: false
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.answerPreCheckoutQuery(undefined, {
        answerPreCheckoutQuery: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.answerPreCheckoutQuery(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.answerPreCheckoutQuery(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.answerPreCheckoutQuery(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
