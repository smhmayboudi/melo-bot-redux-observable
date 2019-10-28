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
      return { ...state, error: action.answerShippingQuery.error };
    case actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_QUERY:
      return { ...state, query: action.answerShippingQuery.query };
    case actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_RESULT:
      return { ...state, result: action.answerShippingQuery.result };
    default:
      return state;
  }
};

export { answerShippingQuery };
