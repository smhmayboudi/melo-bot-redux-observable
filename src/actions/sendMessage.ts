import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IStateSendMessage } from "../../types/iStateSendMessage";

const initialState: IStateSendMessage = {};

const SEND_MESSAGE_ERROR: string = "SEND_MESSAGE_ERROR";
const SEND_MESSAGE_QUERY: string = "SEND_MESSAGE_QUERY";
const SEND_MESSAGE_RESULT: string = "SEND_MESSAGE_RESULT";

const error: (sendMessage: IStateSendMessage) => IActionSendMessage = (
  sendMessage: IStateSendMessage
): IActionSendMessage => ({
  sendMessage: {
    error: sendMessage.error
  },
  type: SEND_MESSAGE_ERROR
});
const query: (sendMessage: IStateSendMessage) => IActionSendMessage = (
  sendMessage: IStateSendMessage
): IActionSendMessage => ({
  sendMessage: {
    query: sendMessage.query
  },
  type: SEND_MESSAGE_QUERY
});
const result: (sendMessage: IStateSendMessage) => IActionSendMessage = (
  sendMessage: IStateSendMessage
): IActionSendMessage => ({
  sendMessage: {
    result: sendMessage.result
  },
  type: SEND_MESSAGE_RESULT
});

export {
  initialState,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_QUERY,
  SEND_MESSAGE_RESULT,
  error,
  query,
  result
};
