import { IStateAnswerCallbackQueryQuery } from "../../types/iStateAnswerCallbackQueryQuery";

import * as action from "./answerCallbackQuery";

describe("answerCallbackQuery actions", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerCallbackQueryQuery = {
    callback_query_id: ""
  };
  const result: boolean = true;

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      answerCallbackQuery: { error },
      type: action.ANSWER_CALLBACK_QUERY_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      answerCallbackQuery: { query },
      type: action.ANSWER_CALLBACK_QUERY_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      answerCallbackQuery: { result },
      type: action.ANSWER_CALLBACK_QUERY_RESULT
    });
  });
});
