import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import * as actions from "../actions";

const answerInlineQuery: (
  state: IStateAnswerInlineQuery | undefined,
  action: IActionAnswerInlineQuery
) => IStateAnswerInlineQuery = (
  state: IStateAnswerInlineQuery | undefined = actions.answerInlineQuery
    .initialState,
  action: IActionAnswerInlineQuery
): IStateAnswerInlineQuery => {
  switch (action.type) {
    case actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR:
      return { ...state, error: action.answerInlineQuery.error };
    case actions.answerInlineQuery.ANSWER_INLINE_QUERY_QUERY:
      return { ...state, query: action.answerInlineQuery.query };
    case actions.answerInlineQuery.ANSWER_INLINE_QUERY_RESULT:
      return { ...state, result: action.answerInlineQuery.result };
    default:
      return state;
  }
};

export { answerInlineQuery };
