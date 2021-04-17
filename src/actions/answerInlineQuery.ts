import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";

const initialState: IStateAnswerInlineQuery = {};

const ANSWER_INLINE_QUERY_ERROR = "ANSWER_INLINE_QUERY_ERROR";
const ANSWER_INLINE_QUERY_QUERY = "ANSWER_INLINE_QUERY_QUERY";
const ANSWER_INLINE_QUERY_RESULT = "ANSWER_INLINE_QUERY_RESULT";

const error: (
  answerInlineQuery: IStateAnswerInlineQuery
) => IActionAnswerInlineQuery = (
  answerInlineQuery: IStateAnswerInlineQuery
): IActionAnswerInlineQuery => ({
  answerInlineQuery: { error: answerInlineQuery.error },
  type: ANSWER_INLINE_QUERY_ERROR
});
const query: (
  answerInlineQuery: IStateAnswerInlineQuery
) => IActionAnswerInlineQuery = (
  answerInlineQuery: IStateAnswerInlineQuery
): IActionAnswerInlineQuery => ({
  answerInlineQuery: { query: answerInlineQuery.query },
  type: ANSWER_INLINE_QUERY_QUERY
});
const result: (
  answerInlineQuery: IStateAnswerInlineQuery
) => IActionAnswerInlineQuery = (
  answerInlineQuery: IStateAnswerInlineQuery
): IActionAnswerInlineQuery => ({
  answerInlineQuery: { result: answerInlineQuery.result },
  type: ANSWER_INLINE_QUERY_RESULT
});

export {
  initialState,
  ANSWER_INLINE_QUERY_ERROR,
  ANSWER_INLINE_QUERY_QUERY,
  ANSWER_INLINE_QUERY_RESULT,
  error,
  query,
  result
};
