import { IActionCallbackDataFind } from "../../types/iActionCallbackDataFind";
import { IStateCallbackDataFind } from "../../types/iStateCallbackDataFind";
import * as actions from "../actions";

const callbackDataFind: (
  state: IStateCallbackDataFind | undefined,
  action: IActionCallbackDataFind
) => IStateCallbackDataFind = (
  state: IStateCallbackDataFind | undefined = actions.callbackDataFind
    .initialState,
  action: IActionCallbackDataFind
): IStateCallbackDataFind => {
  switch (action.type) {
    case actions.callbackDataFind.CALLBACK_DATA_FIND_ERROR:
      return { error: action.callbackDataFind.error, query: state.query };
    case actions.callbackDataFind.CALLBACK_DATA_FIND_QUERY:
      return { query: action.callbackDataFind.query };
    case actions.callbackDataFind.CALLBACK_DATA_FIND_RESULT:
      return { query: state.query, result: action.callbackDataFind.result };
    default:
      return state;
  }
};

export { callbackDataFind };
