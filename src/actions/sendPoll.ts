import { IActionSendPoll } from "../../types/iActionSendPoll";
import { IStateSendPoll } from "../../types/iStateSendPoll";

const initialState: IStateSendPoll = {};

const SEND_POLL_ERROR: string = "SEND_POLL_ERROR";
const SEND_POLL_QUERY: string = "SEND_POLL_QUERY";
const SEND_POLL_RESULT: string = "SEND_POLL_RESULT";

const error: (sendPoll: IStateSendPoll) => IActionSendPoll = (
  sendPoll: IStateSendPoll
): IActionSendPoll => ({
  sendPoll: {
    error: sendPoll.error
  },
  type: SEND_POLL_ERROR
});
const query: (sendPoll: IStateSendPoll) => IActionSendPoll = (
  sendPoll: IStateSendPoll
): IActionSendPoll => ({
  sendPoll: {
    query: sendPoll.query
  },
  type: SEND_POLL_QUERY
});
const result: (sendPoll: IStateSendPoll) => IActionSendPoll = (
  sendPoll: IStateSendPoll
): IActionSendPoll => ({
  sendPoll: {
    result: sendPoll.result
  },
  type: SEND_POLL_RESULT
});

export {
  initialState,
  SEND_POLL_ERROR,
  SEND_POLL_QUERY,
  SEND_POLL_RESULT,
  error,
  query,
  result
};
