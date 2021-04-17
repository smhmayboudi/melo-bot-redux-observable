import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IStateCallbackQueryDataFind } from "../../types/iStateCallbackQueryDataFind";
import * as actions from "../actions";

const callbackQueryDataFind: (
  state: IStateCallbackQueryDataFind | undefined,
  action: IActionCallbackQueryDataFind
) => IStateCallbackQueryDataFind = (
  state: IStateCallbackQueryDataFind | undefined = actions.callbackQueryDataFind
    .initialState,
  action: IActionCallbackQueryDataFind
): IStateCallbackQueryDataFind => {
  switch (action.type) {
    case actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_ERROR:
      return { error: action.callbackQueryDataFind.error, query: state.query };
    case actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_QUERY:
      return { query: action.callbackQueryDataFind.query };
    case actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_RESULT:
      return {
        query: state.query,
        result: action.callbackQueryDataFind.result
      };
    default:
      return state;
  }
};

export { callbackQueryDataFind };
