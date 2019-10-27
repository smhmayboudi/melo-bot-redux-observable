import { IActionStopMessageLiveLocation } from "../../types/iActionStopMessageLiveLocation";
import { IStateStopMessageLiveLocation } from "../../types/iStateStopMessageLiveLocation";
import * as actions from "../actions";

const stopMessageLiveLocation: (
  state: IStateStopMessageLiveLocation | undefined,
  action: IActionStopMessageLiveLocation
) => IStateStopMessageLiveLocation = (
  state: IStateStopMessageLiveLocation | undefined = actions
    .stopMessageLiveLocation.initialState,
  action: IActionStopMessageLiveLocation
): IStateStopMessageLiveLocation => {
  switch (action.type) {
    case actions.stopMessageLiveLocation.STOP_MESSAGE_LIVE_LOCATION_ERROR:
      return {
        error: action.stopMessageLiveLocation.error,
        query: state.query
      };
    case actions.stopMessageLiveLocation.STOP_MESSAGE_LIVE_LOCATION_QUERY:
      return { query: action.stopMessageLiveLocation.query };
    case actions.stopMessageLiveLocation.STOP_MESSAGE_LIVE_LOCATION_RESULT:
      return {
        query: state.query,
        result: action.stopMessageLiveLocation.result
      };
    default:
      return state;
  }
};

export { stopMessageLiveLocation };
