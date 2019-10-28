import { IActionEditMessageLiveLocation } from "../../types/iActionEditMessageLiveLocation";
import { IStateEditMessageLiveLocation } from "../../types/iStateEditMessageLiveLocation";
import * as actions from "../actions";

const editMessageLiveLocation: (
  state: IStateEditMessageLiveLocation | undefined,
  action: IActionEditMessageLiveLocation
) => IStateEditMessageLiveLocation = (
  state: IStateEditMessageLiveLocation | undefined = actions
    .editMessageLiveLocation.initialState,
  action: IActionEditMessageLiveLocation
): IStateEditMessageLiveLocation => {
  switch (action.type) {
    case actions.editMessageLiveLocation.EDIT_MESSAGE_LIVE_LOCATION_ERROR:
      return {
        ...state,
        error: action.editMessageLiveLocation.error
      };
    case actions.editMessageLiveLocation.EDIT_MESSAGE_LIVE_LOCATION_QUERY:
      return { ...state, query: action.editMessageLiveLocation.query };
    case actions.editMessageLiveLocation.EDIT_MESSAGE_LIVE_LOCATION_RESULT:
      return {
        ...state,
        result: action.editMessageLiveLocation.result
      };
    default:
      return state;
  }
};

export { editMessageLiveLocation };
