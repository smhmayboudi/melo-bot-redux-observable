import { IActionSendLocation } from "../../types/iActionSendLocation";
import { IStateSendLocation } from "../../types/iStateSendLocation";
import * as actions from "../actions";

const sendLocation: (
  state: IStateSendLocation | undefined,
  action: IActionSendLocation
) => IStateSendLocation = (
  state: IStateSendLocation | undefined = actions.sendLocation.initialState,
  action: IActionSendLocation
): IStateSendLocation => {
  switch (action.type) {
    case actions.sendLocation.SEND_LOCATION_ERROR:
      return { error: action.sendLocation.error, query: state.query };
    case actions.sendLocation.SEND_LOCATION_QUERY:
      return { query: action.sendLocation.query };
    case actions.sendLocation.SEND_LOCATION_RESULT:
      return { query: state.query, result: action.sendLocation.result };
    default:
      return state;
  }
};

export { sendLocation };
