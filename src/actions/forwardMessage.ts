import { IActionForwardMessage } from "../../types/iActionForwardMessage";
import { IStateForwardMessage } from "../../types/iStateForwardMessage";

const initialState: IStateForwardMessage = {};

const FORWARD_MESSAGE_ERROR: string = "FORWARD_MESSAGE_ERROR";
const FORWARD_MESSAGE_QUERY: string = "FORWARD_MESSAGE_QUERY";
const FORWARD_MESSAGE_RESULT: string = "FORWARD_MESSAGE_RESULT";

const error: (forwardMessage: IStateForwardMessage) => IActionForwardMessage = (
  forwardMessage: IStateForwardMessage
): IActionForwardMessage => ({
  forwardMessage: {
    error: forwardMessage.error
  },
  type: FORWARD_MESSAGE_ERROR
});
const query: (forwardMessage: IStateForwardMessage) => IActionForwardMessage = (
  forwardMessage: IStateForwardMessage
): IActionForwardMessage => ({
  forwardMessage: {
    query: forwardMessage.query
  },
  type: FORWARD_MESSAGE_QUERY
});
const result: (
  forwardMessage: IStateForwardMessage
) => IActionForwardMessage = (
  forwardMessage: IStateForwardMessage
): IActionForwardMessage => ({
  forwardMessage: {
    result: forwardMessage.result
  },
  type: FORWARD_MESSAGE_RESULT
});

export {
  initialState,
  FORWARD_MESSAGE_ERROR,
  FORWARD_MESSAGE_QUERY,
  FORWARD_MESSAGE_RESULT,
  error,
  query,
  result
};
