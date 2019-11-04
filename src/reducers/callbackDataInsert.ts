import { IActionCallbackDataInsert } from "../../types/iActionCallbackDataInsert";
import { IStateCallbackDataInsert } from "../../types/iStateCallbackDataInsert";
import * as actions from "../actions";

const callbackDataInsert: (
  state: IStateCallbackDataInsert | undefined,
  action: IActionCallbackDataInsert
) => IStateCallbackDataInsert = (
  state: IStateCallbackDataInsert | undefined = actions.callbackDataInsert
    .initialState,
  action: IActionCallbackDataInsert
): IStateCallbackDataInsert => {
  switch (action.type) {
    case actions.callbackDataInsert.CALLBACK_DATA_INSERT_ERROR:
      return { error: action.callbackDataInsert.error, query: state.query };
    case actions.callbackDataInsert.CALLBACK_DATA_INSERT_QUERY:
      return { query: action.callbackDataInsert.query };
    case actions.callbackDataInsert.CALLBACK_DATA_INSERT_RESULT:
      return { query: state.query, result: action.callbackDataInsert.result };
    default:
      return state;
  }
};

export { callbackDataInsert };
