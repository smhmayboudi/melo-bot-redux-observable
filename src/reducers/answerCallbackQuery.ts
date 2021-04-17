import { IActionAnswerCallbackQuery } from "../../types/iActionAnswerCallbackQuery";
import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import * as actions from "../actions";

const answerCallbackQuery: (
  state: IStateAnswerCallbackQuery | undefined,
  action: IActionAnswerCallbackQuery
) => IStateAnswerCallbackQuery = (
  state: IStateAnswerCallbackQuery | undefined = actions.answerCallbackQuery
    .initialState,
  action: IActionAnswerCallbackQuery
): IStateAnswerCallbackQuery => {
  switch (action.type) {
    case actions.answerCallbackQuery.ANSWER_CALLBACK_QUERY_ERROR:
      return { ...state, error: action.answerCallbackQuery.error };
    case actions.answerCallbackQuery.ANSWER_CALLBACK_QUERY_QUERY:
      return { ...state, query: action.answerCallbackQuery.query };
    case actions.answerCallbackQuery.ANSWER_CALLBACK_QUERY_RESULT:
      return { ...state, result: action.answerCallbackQuery.result };
    default:
      return state;
  }
};

export { answerCallbackQuery };
