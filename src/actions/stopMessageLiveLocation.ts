import { IActionStopMessageLiveLocation } from "../../types/iActionStopMessageLiveLocation";
import { IStateStopMessageLiveLocation } from "../../types/iStateStopMessageLiveLocation";

const initialState: IStateStopMessageLiveLocation = {};

const STOP_MESSAGE_LIVE_LOCATION_ERROR = "STOP_MESSAGE_LIVE_LOCATION_ERROR";
const STOP_MESSAGE_LIVE_LOCATION_QUERY = "STOP_MESSAGE_LIVE_LOCATION_QUERY";
const STOP_MESSAGE_LIVE_LOCATION_RESULT = "STOP_MESSAGE_LIVE_LOCATION_RESULT";

const error: (
  stopMessageLiveLocation: IStateStopMessageLiveLocation
) => IActionStopMessageLiveLocation = (
  stopMessageLiveLocation: IStateStopMessageLiveLocation
): IActionStopMessageLiveLocation => ({
  stopMessageLiveLocation: { error: stopMessageLiveLocation.error },
  type: STOP_MESSAGE_LIVE_LOCATION_ERROR
});
const query: (
  stopMessageLiveLocation: IStateStopMessageLiveLocation
) => IActionStopMessageLiveLocation = (
  stopMessageLiveLocation: IStateStopMessageLiveLocation
): IActionStopMessageLiveLocation => ({
  stopMessageLiveLocation: { query: stopMessageLiveLocation.query },
  type: STOP_MESSAGE_LIVE_LOCATION_QUERY
});
const result: (
  stopMessageLiveLocation: IStateStopMessageLiveLocation
) => IActionStopMessageLiveLocation = (
  stopMessageLiveLocation: IStateStopMessageLiveLocation
): IActionStopMessageLiveLocation => ({
  stopMessageLiveLocation: { result: stopMessageLiveLocation.result },
  type: STOP_MESSAGE_LIVE_LOCATION_RESULT
});

export {
  initialState,
  STOP_MESSAGE_LIVE_LOCATION_ERROR,
  STOP_MESSAGE_LIVE_LOCATION_QUERY,
  STOP_MESSAGE_LIVE_LOCATION_RESULT,
  error,
  query,
  result
};
