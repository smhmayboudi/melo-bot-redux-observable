import { IStateAnswerInlineQueryQuery } from "../../types/iStateAnswerInlineQueryQuery";
import * as action from "../actions/answerInlineQuery";

import * as reducer from "./answerInlineQuery";

describe("answerInlineQuery reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerInlineQueryQuery = {
    inline_query_id: "",
    results: []
  };
  const result = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.answerInlineQuery(undefined, { answerInlineQuery: {}, type: "" })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.answerInlineQuery(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.answerInlineQuery(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.answerInlineQuery(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
