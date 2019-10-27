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
      return { error: action.getUpdates.error, query: state.query };
    case actions.getUpdates.GET_UPDATES_QUERY:
      return { query: action.getUpdates.query };
    case actions.getUpdates.GET_UPDATES_RESULT:
      return { query: state.query, result: action.getUpdates.result };
    default:
      return state;
  }
};

export { getUpdates };
