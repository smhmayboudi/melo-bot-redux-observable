import { IActionAnswerShippingQuery } from "../../types/iActionAnswerShippingQuery";
import { IStateAnswerShippingQuery } from "../../types/iStateAnswerShippingQuery";
import * as actions from "../actions";

const answerShippingQuery: (
  state: IStateAnswerShippingQuery | undefined,
  action: IActionAnswerShippingQuery
) => IStateAnswerShippingQuery = (
  state: IStateAnswerShippingQuery | undefined = actions.answerShippingQuery
    .initialState,
  action: IActionAnswerShippingQuery
): IStateAnswerShippingQuery => {
  switch (action.type) {
    case actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_ERROR:
      return { error: action.answerShippingQuery.error, query: state.query };
    case actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_QUERY:
      return { query: action.answerShippingQuery.query };
    case actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_RESULT:
      return { query: state.query, result: action.answerShippingQuery.result };
    default:
      return state;
  }
};

export { answerShippingQuery };
