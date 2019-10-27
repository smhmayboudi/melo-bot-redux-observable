import { IActionStopPoll } from "../../types/iActionStopPoll";
import { IStateStopPoll } from "../../types/iStateStopPoll";
import * as actions from "../actions";

const stopPoll: (
  state: IStateStopPoll | undefined,
  action: IActionStopPoll
) => IStateStopPoll = (
  state: IStateStopPoll | undefined = actions.stopPoll.initialState,
  action: IActionStopPoll
): IStateStopPoll => {
  switch (action.type) {
    case actions.stopPoll.STOP_POLL_ERROR:
      return { error: action.stopPoll.error, query: state.query };
    case actions.stopPoll.STOP_POLL_QUERY:
      return { query: action.stopPoll.query };
    case actions.stopPoll.STOP_POLL_RESULT:
      return { query: state.query, result: action.stopPoll.result };
    default:
      return state;
  }
};

export { stopPoll };
