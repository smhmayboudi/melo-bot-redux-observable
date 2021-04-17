import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";

const initialState: IStateInlineQuery = {};

const INLINE_QUERY_ERROR = "INLINE_QUERY_ERROR";
const INLINE_QUERY_QUERY = "INLINE_QUERY_QUERY";
const INLINE_QUERY_RESULT = "INLINE_QUERY_RESULT";

const error: (inlineQuery: IStateInlineQuery) => IActionInlineQuery = (
  inlineQuery: IStateInlineQuery
): IActionInlineQuery => ({
  inlineQuery: { error: inlineQuery.error },
  type: INLINE_QUERY_ERROR
});
const query: (inlineQuery: IStateInlineQuery) => IActionInlineQuery = (
  inlineQuery: IStateInlineQuery
): IActionInlineQuery => ({
  inlineQuery: { query: inlineQuery.query },
  type: INLINE_QUERY_QUERY
});
const result: (inlineQuery: IStateInlineQuery) => IActionInlineQuery = (
  inlineQuery: IStateInlineQuery
): IActionInlineQuery => ({
  inlineQuery: { result: inlineQuery.result },
  type: INLINE_QUERY_RESULT
});

export {
  initialState,
  INLINE_QUERY_ERROR,
  INLINE_QUERY_QUERY,
  INLINE_QUERY_RESULT,
  error,
  query,
  result
};
