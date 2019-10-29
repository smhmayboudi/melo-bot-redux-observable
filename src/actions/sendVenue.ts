import { IActionSendVenue } from "../../types/iActionSendVenue";
import { IStateSendVenue } from "../../types/iStateSendVenue";

const initialState: IStateSendVenue = {};

const SEND_VENUE_ERROR = "SEND_VENUE_ERROR";
const SEND_VENUE_QUERY = "SEND_VENUE_QUERY";
const SEND_VENUE_RESULT = "SEND_VENUE_RESULT";

const error: (sendVenue: IStateSendVenue) => IActionSendVenue = (
  sendVenue: IStateSendVenue
): IActionSendVenue => ({
  sendVenue: {
    error: sendVenue.error
  },
  type: SEND_VENUE_ERROR
});
const query: (sendVenue: IStateSendVenue) => IActionSendVenue = (
  sendVenue: IStateSendVenue
): IActionSendVenue => ({
  sendVenue: {
    query: sendVenue.query
  },
  type: SEND_VENUE_QUERY
});
const result: (sendVenue: IStateSendVenue) => IActionSendVenue = (
  sendVenue: IStateSendVenue
): IActionSendVenue => ({
  sendVenue: {
    result: sendVenue.result
  },
  type: SEND_VENUE_RESULT
});

export {
  initialState,
  SEND_VENUE_ERROR,
  SEND_VENUE_QUERY,
  SEND_VENUE_RESULT,
  error,
  query,
  result
};
