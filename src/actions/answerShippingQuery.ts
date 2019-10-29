import { IActionAnswerShippingQuery } from "../../types/iActionAnswerShippingQuery";
import { IStateAnswerShippingQuery } from "../../types/iStateAnswerShippingQuery";

const initialState: IStateAnswerShippingQuery = {};

const ANSWER_SHIPPING_QUERY_ERROR = "ANSWER_SHIPPING_QUERY_ERROR";
const ANSWER_SHIPPING_QUERY_QUERY = "ANSWER_SHIPPING_QUERY_QUERY";
const ANSWER_SHIPPING_QUERY_RESULT = "ANSWER_SHIPPING_QUERY_RESULT";

const error: (
  answerShippingQuery: IStateAnswerShippingQuery
) => IActionAnswerShippingQuery = (
  answerShippingQuery: IStateAnswerShippingQuery
): IActionAnswerShippingQuery => ({
  answerShippingQuery: {
    error: answerShippingQuery.error
  },
  type: ANSWER_SHIPPING_QUERY_ERROR
});
const query: (
  answerShippingQuery: IStateAnswerShippingQuery
) => IActionAnswerShippingQuery = (
  answerShippingQuery: IStateAnswerShippingQuery
): IActionAnswerShippingQuery => ({
  answerShippingQuery: {
    query: answerShippingQuery.query
  },
  type: ANSWER_SHIPPING_QUERY_QUERY
});
const result: (
  answerShippingQuery: IStateAnswerShippingQuery
) => IActionAnswerShippingQuery = (
  answerShippingQuery: IStateAnswerShippingQuery
): IActionAnswerShippingQuery => ({
  answerShippingQuery: {
    result: answerShippingQuery.result
  },
  type: ANSWER_SHIPPING_QUERY_RESULT
});

export {
  initialState,
  ANSWER_SHIPPING_QUERY_ERROR,
  ANSWER_SHIPPING_QUERY_QUERY,
  ANSWER_SHIPPING_QUERY_RESULT,
  error,
  query,
  result
};
