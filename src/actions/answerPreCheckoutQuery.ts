import { IActionAnswerPreCheckoutQuery } from "../../types/iActionAnswerPreCheckoutQuery";
import { IStateAnswerPreCheckoutQuery } from "../../types/iStateAnswerPreCheckoutQuery";

const initialState: IStateAnswerPreCheckoutQuery = {};

const ANSWER_PRE_CHECKOUT_QUERY_ERROR = "ANSWER_PRE_CHECKOUT_QUERY_ERROR";
const ANSWER_PRE_CHECKOUT_QUERY_QUERY = "ANSWER_PRE_CHECKOUT_QUERY_QUERY";
const ANSWER_PRE_CHECKOUT_QUERY_RESULT = "ANSWER_PRE_CHECKOUT_QUERY_RESULT";

const error: (
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery
) => IActionAnswerPreCheckoutQuery = (
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery
): IActionAnswerPreCheckoutQuery => ({
  answerPreCheckoutQuery: {
    error: answerPreCheckoutQuery.error
  },
  type: ANSWER_PRE_CHECKOUT_QUERY_ERROR
});
const query: (
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery
) => IActionAnswerPreCheckoutQuery = (
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery
): IActionAnswerPreCheckoutQuery => ({
  answerPreCheckoutQuery: {
    query: answerPreCheckoutQuery.query
  },
  type: ANSWER_PRE_CHECKOUT_QUERY_QUERY
});
const result: (
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery
) => IActionAnswerPreCheckoutQuery = (
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery
): IActionAnswerPreCheckoutQuery => ({
  answerPreCheckoutQuery: {
    result: answerPreCheckoutQuery.result
  },
  type: ANSWER_PRE_CHECKOUT_QUERY_RESULT
});

export {
  initialState,
  ANSWER_PRE_CHECKOUT_QUERY_ERROR,
  ANSWER_PRE_CHECKOUT_QUERY_QUERY,
  ANSWER_PRE_CHECKOUT_QUERY_RESULT,
  error,
  query,
  result
};
