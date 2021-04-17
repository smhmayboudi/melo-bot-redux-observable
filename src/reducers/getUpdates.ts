import { IActionGetUpdates } from "../../types/iActionGetUpdates";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";
import * as actions from "../actions";

const getUpdates: (
  state: IStateGetUpdates | undefined,
  action: IActionGetUpdates
) => IStateGetUpdates = (
  state: IStateGetUpdates | undefined = actions.getUpdates.initialState,
  action: IActionGetUpdates
): IStateGetUpdates => {
  switch (action.type) {
    case actions.getUpdates.GET_UPDATES_ERROR:
      return { ...state, error: action.getUpdates.error };
    case actions.getUpdates.GET_UPDATES_QUERY:
      return { ...state, query: action.getUpdates.query };
    case actions.getUpdates.GET_UPDATES_RESULT:
      return { ...state, result: action.getUpdates.result };
    default:
      return state;
  }
};

export { getUpdates };
