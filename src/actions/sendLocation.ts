import { IActionSendLocation } from "../../types/iActionSendLocation";
import { IStateSendLocation } from "../../types/iStateSendLocation";

const initialState: IStateSendLocation = {};

const SEND_LOCATION_ERROR: string = "SEND_LOCATION_ERROR";
const SEND_LOCATION_QUERY: string = "SEND_LOCATION_QUERY";
const SEND_LOCATION_RESULT: string = "SEND_LOCATION_RESULT";

const error: (sendLocation: IStateSendLocation) => IActionSendLocation = (
  sendLocation: IStateSendLocation
): IActionSendLocation => ({
  sendLocation: {
    error: sendLocation.error
  },
  type: SEND_LOCATION_ERROR
});
const query: (sendLocation: IStateSendLocation) => IActionSendLocation = (
  sendLocation: IStateSendLocation
): IActionSendLocation => ({
  sendLocation: {
    query: sendLocation.query
  },
  type: SEND_LOCATION_QUERY
});
const result: (sendLocation: IStateSendLocation) => IActionSendLocation = (
  sendLocation: IStateSendLocation
): IActionSendLocation => ({
  sendLocation: {
    result: sendLocation.result
  },
  type: SEND_LOCATION_RESULT
});

export {
  initialState,
  SEND_LOCATION_ERROR,
  SEND_LOCATION_QUERY,
  SEND_LOCATION_RESULT,
  error,
  query,
  result
};
