import { IActionEditMessageLiveLocation } from "../../types/iActionEditMessageLiveLocation";
import { IStateEditMessageLiveLocation } from "../../types/iStateEditMessageLiveLocation";

const initialState: IStateEditMessageLiveLocation = {};

const EDIT_MESSAGE_LIVE_LOCATION_ERROR: string =
  "EDIT_MESSAGE_LIVE_LOCATION_ERROR";
const EDIT_MESSAGE_LIVE_LOCATION_QUERY: string =
  "EDIT_MESSAGE_LIVE_LOCATION_QUERY";
const EDIT_MESSAGE_LIVE_LOCATION_RESULT: string =
  "EDIT_MESSAGE_LIVE_LOCATION_RESULT";

const error: (
  editMessageLiveLocation: IStateEditMessageLiveLocation
) => IActionEditMessageLiveLocation = (
  editMessageLiveLocation: IStateEditMessageLiveLocation
): IActionEditMessageLiveLocation => ({
  editMessageLiveLocation: {
    error: editMessageLiveLocation.error
  },
  type: EDIT_MESSAGE_LIVE_LOCATION_ERROR
});
const query: (
  editMessageLiveLocation: IStateEditMessageLiveLocation
) => IActionEditMessageLiveLocation = (
  editMessageLiveLocation: IStateEditMessageLiveLocation
): IActionEditMessageLiveLocation => ({
  editMessageLiveLocation: {
    query: editMessageLiveLocation.query
  },
  type: EDIT_MESSAGE_LIVE_LOCATION_QUERY
});
const result: (
  editMessageLiveLocation: IStateEditMessageLiveLocation
) => IActionEditMessageLiveLocation = (
  editMessageLiveLocation: IStateEditMessageLiveLocation
): IActionEditMessageLiveLocation => ({
  editMessageLiveLocation: {
    result: editMessageLiveLocation.result
  },
  type: EDIT_MESSAGE_LIVE_LOCATION_RESULT
});

export {
  initialState,
  EDIT_MESSAGE_LIVE_LOCATION_ERROR,
  EDIT_MESSAGE_LIVE_LOCATION_QUERY,
  EDIT_MESSAGE_LIVE_LOCATION_RESULT,
  error,
  query,
  result
};
