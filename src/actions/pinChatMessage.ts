import { IActionPinChatMessage } from "../../types/iActionPinChatMessage";
import { IStatePinChatMessage } from "../../types/iStatePinChatMessage";

const initialState: IStatePinChatMessage = {};

const PIN_CHAT_MESSAGE_ERROR = "PIN_CHAT_MESSAGE_ERROR";
const PIN_CHAT_MESSAGE_QUERY = "PIN_CHAT_MESSAGE_QUERY";
const PIN_CHAT_MESSAGE_RESULT = "PIN_CHAT_MESSAGE_RESULT";

const error: (pinChatMessage: IStatePinChatMessage) => IActionPinChatMessage = (
  pinChatMessage: IStatePinChatMessage
): IActionPinChatMessage => ({
  pinChatMessage: {
    error: pinChatMessage.error
  },
  type: PIN_CHAT_MESSAGE_ERROR
});
const query: (pinChatMessage: IStatePinChatMessage) => IActionPinChatMessage = (
  pinChatMessage: IStatePinChatMessage
): IActionPinChatMessage => ({
  pinChatMessage: {
    query: pinChatMessage.query
  },
  type: PIN_CHAT_MESSAGE_QUERY
});
const result: (
  pinChatMessage: IStatePinChatMessage
) => IActionPinChatMessage = (
  pinChatMessage: IStatePinChatMessage
): IActionPinChatMessage => ({
  pinChatMessage: {
    result: pinChatMessage.result
  },
  type: PIN_CHAT_MESSAGE_RESULT
});

export {
  initialState,
  PIN_CHAT_MESSAGE_ERROR,
  PIN_CHAT_MESSAGE_QUERY,
  PIN_CHAT_MESSAGE_RESULT,
  error,
  query,
  result
};
