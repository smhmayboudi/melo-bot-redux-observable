import { IActionSendVenue } from "../../types/iActionSendVenue";
import { IStateSendVenue } from "../../types/iStateSendVenue";
import * as actions from "../actions";

const sendVenue: (
  state: IStateSendVenue | undefined,
  action: IActionSendVenue
) => IStateSendVenue = (
  state: IStateSendVenue | undefined = actions.sendVenue.initialState,
  action: IActionSendVenue
): IStateSendVenue => {
  switch (action.type) {
    case actions.sendVenue.SEND_VENUE_ERROR:
      return { error: action.sendVenue.error, query: state.query };
    case actions.sendVenue.SEND_VENUE_QUERY:
      return { query: action.sendVenue.query };
    case actions.sendVenue.SEND_VENUE_RESULT:
      return { query: state.query, result: action.sendVenue.result };
    default:
      return state;
  }
};

export { sendVenue };
