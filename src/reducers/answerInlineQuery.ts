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
      return { error: action.answerInlineQuery.error, query: state.query };
    case actions.answerInlineQuery.ANSWER_INLINE_QUERY_QUERY:
      return { query: action.answerInlineQuery.query };
    case actions.answerInlineQuery.ANSWER_INLINE_QUERY_RESULT:
      return { query: state.query, result: action.answerInlineQuery.result };
    default:
      return state;
  }
};

export { answerInlineQuery };
