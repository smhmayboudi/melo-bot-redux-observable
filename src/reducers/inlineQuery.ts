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
      return { error: action.inlineQuery.error, query: state.query };
    case actions.inlineQuery.INLINE_QUERY_QUERY:
      return { query: action.inlineQuery.query };
    case actions.inlineQuery.INLINE_QUERY_RESULT:
      return { query: state.query, result: action.inlineQuery.result };
    default:
      return state;
  }
};

export { inlineQuery };
