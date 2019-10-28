import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import * as actions from "../actions";

const inlineQuery: (
  state: IStateInlineQuery | undefined,
  action: IActionInlineQuery
) => IStateInlineQuery = (
  state: IStateInlineQuery | undefined = actions.inlineQuery.initialState,
  action: IActionInlineQuery
): IStateInlineQuery => {
  switch (action.type) {
    case actions.inlineQuery.INLINE_QUERY_ERROR:
      return { ...state, error: action.inlineQuery.error };
    case actions.inlineQuery.INLINE_QUERY_QUERY:
      return { ...state, query: action.inlineQuery.query };
    case actions.inlineQuery.INLINE_QUERY_RESULT:
      return { ...state, result: action.inlineQuery.result };
    default:
      return state;
  }
};

export { inlineQuery };
