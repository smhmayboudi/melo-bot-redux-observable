import { IActionAnswerCallbackQuery } from "../../types/iActionAnswerCallbackQuery";
import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";

const initialState: IStateAnswerCallbackQuery = {};

const ANSWER_CALLBACK_QUERY_ERROR = "ANSWER_CALLBACK_QUERY_ERROR";
const ANSWER_CALLBACK_QUERY_QUERY = "ANSWER_CALLBACK_QUERY_QUERY";
const ANSWER_CALLBACK_QUERY_RESULT = "ANSWER_CALLBACK_QUERY_RESULT";

const error: (
  answerCallbackQuery: IStateAnswerCallbackQuery
) => IActionAnswerCallbackQuery = (
  answerCallbackQuery: IStateAnswerCallbackQuery
): IActionAnswerCallbackQuery => ({
  answerCallbackQuery: { error: answerCallbackQuery.error },
  type: ANSWER_CALLBACK_QUERY_ERROR
});
const query: (
  answerCallbackQuery: IStateAnswerCallbackQuery
) => IActionAnswerCallbackQuery = (
  answerCallbackQuery: IStateAnswerCallbackQuery
): IActionAnswerCallbackQuery => ({
  answerCallbackQuery: { query: answerCallbackQuery.query },
  type: ANSWER_CALLBACK_QUERY_QUERY
});
const result: (
  answerCallbackQuery: IStateAnswerCallbackQuery
) => IActionAnswerCallbackQuery = (
  answerCallbackQuery: IStateAnswerCallbackQuery
): IActionAnswerCallbackQuery => ({
  answerCallbackQuery: { result: answerCallbackQuery.result },
  type: ANSWER_CALLBACK_QUERY_RESULT
});

export {
  initialState,
  ANSWER_CALLBACK_QUERY_ERROR,
  ANSWER_CALLBACK_QUERY_QUERY,
  ANSWER_CALLBACK_QUERY_RESULT,
  error,
  query,
  result
};
