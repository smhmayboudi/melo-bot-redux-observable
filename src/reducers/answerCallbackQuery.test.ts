import { IStateAnswerCallbackQueryQuery } from "../../types/iStateAnswerCallbackQueryQuery";
import * as action from "../actions/answerCallbackQuery";

import * as reducer from "./answerCallbackQuery";

describe("answerCallbackQuery reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerCallbackQueryQuery = {
    callback_query_id: ""
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.answerCallbackQuery(undefined, {
        answerCallbackQuery: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.answerCallbackQuery(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.answerCallbackQuery(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.answerCallbackQuery(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
