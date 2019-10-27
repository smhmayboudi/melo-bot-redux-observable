import { IActionAnswerPreCheckoutQuery } from "../../types/iActionAnswerPreCheckoutQuery";
import { IStateAnswerPreCheckoutQuery } from "../../types/iStateAnswerPreCheckoutQuery";
import * as actions from "../actions";

const answerPreCheckoutQuery: (
  state: IStateAnswerPreCheckoutQuery | undefined,
  action: IActionAnswerPreCheckoutQuery
) => IStateAnswerPreCheckoutQuery = (
  state: IStateAnswerPreCheckoutQuery | undefined = actions
    .answerPreCheckoutQuery.initialState,
  action: IActionAnswerPreCheckoutQuery
): IStateAnswerPreCheckoutQuery => {
  switch (action.type) {
    case actions.answerPreCheckoutQuery.ANSWER_PRE_CHECKOUT_QUERY_ERROR:
      return { error: action.answerPreCheckoutQuery.error, query: state.query };
    case actions.answerPreCheckoutQuery.ANSWER_PRE_CHECKOUT_QUERY_QUERY:
      return { query: action.answerPreCheckoutQuery.query };
    case actions.answerPreCheckoutQuery.ANSWER_PRE_CHECKOUT_QUERY_RESULT:
      return {
        query: state.query,
        result: action.answerPreCheckoutQuery.result
      };
    default:
      return state;
  }
};

export { answerPreCheckoutQuery };
