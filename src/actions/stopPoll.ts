import { IActionStopPoll } from "../../types/iActionStopPoll";
import { IStateStopPoll } from "../../types/iStateStopPoll";

const initialState: IStateStopPoll = {};

const STOP_POLL_ERROR: string = "STOP_POLL_ERROR";
const STOP_POLL_QUERY: string = "STOP_POLL_QUERY";
const STOP_POLL_RESULT: string = "STOP_POLL_RESULT";

const error: (stopPoll: IStateStopPoll) => IActionStopPoll = (
  stopPoll: IStateStopPoll
): IActionStopPoll => ({
  stopPoll: {
    error: stopPoll.error
  },
  type: STOP_POLL_ERROR
});
const query: (stopPoll: IStateStopPoll) => IActionStopPoll = (
  stopPoll: IStateStopPoll
): IActionStopPoll => ({
  stopPoll: {
    query: stopPoll.query
  },
  type: STOP_POLL_QUERY
});
const result: (stopPoll: IStateStopPoll) => IActionStopPoll = (
  stopPoll: IStateStopPoll
): IActionStopPoll => ({
  stopPoll: {
    result: stopPoll.result
  },
  type: STOP_POLL_RESULT
});

export {
  initialState,
  STOP_POLL_ERROR,
  STOP_POLL_QUERY,
  STOP_POLL_RESULT,
  error,
  query,
  result
};
