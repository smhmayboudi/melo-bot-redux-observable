import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IStateCallbackQueryDataInsert } from "../../types/iStateCallbackQueryDataInsert";
import * as actions from "../actions";

const callbackQueryDataInsert: (
  state: IStateCallbackQueryDataInsert | undefined,
  action: IActionCallbackQueryDataInsert
) => IStateCallbackQueryDataInsert = (
  state: IStateCallbackQueryDataInsert | undefined = actions
    .callbackQueryDataInsert.initialState,
  action: IActionCallbackQueryDataInsert
): IStateCallbackQueryDataInsert => {
  switch (action.type) {
    case actions.callbackQueryDataInsert.CALLBACK_QUERY_DATA_INSERT_ERROR:
      return {
        error: action.callbackQueryDataInsert.error,
        query: state.query
      };
    case actions.callbackQueryDataInsert.CALLBACK_QUERY_DATA_INSERT_QUERY:
      return { query: action.callbackQueryDataInsert.query };
    case actions.callbackQueryDataInsert.CALLBACK_QUERY_DATA_INSERT_RESULT:
      return {
        query: state.query,
        result: action.callbackQueryDataInsert.result
      };
    default:
      return state;
  }
};

export { callbackQueryDataInsert };
