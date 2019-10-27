import { IActionUnpinChatMessage } from "../../types/iActionUnpinChatMessage";
import { IStateUnpinChatMessage } from "../../types/iStateUnpinChatMessage";

const initialState: IStateUnpinChatMessage = {};

const UNPIN_CHAT_MESSAGE_ERROR: string = "UNPIN_CHAT_MESSAGE_ERROR";
const UNPIN_CHAT_MESSAGE_QUERY: string = "UNPIN_CHAT_MESSAGE_QUERY";
const UNPIN_CHAT_MESSAGE_RESULT: string = "UNPIN_CHAT_MESSAGE_RESULT";

const error: (
  unpinChatMessage: IStateUnpinChatMessage
) => IActionUnpinChatMessage = (
  unpinChatMessage: IStateUnpinChatMessage
): IActionUnpinChatMessage => ({
  type: UNPIN_CHAT_MESSAGE_ERROR,
  unpinChatMessage: {
    error: unpinChatMessage.error
  }
});
const query: (
  unpinChatMessage: IStateUnpinChatMessage
) => IActionUnpinChatMessage = (
  unpinChatMessage: IStateUnpinChatMessage
): IActionUnpinChatMessage => ({
  type: UNPIN_CHAT_MESSAGE_QUERY,
  unpinChatMessage: {
    query: unpinChatMessage.query
  }
});
const result: (
  unpinChatMessage: IStateUnpinChatMessage
) => IActionUnpinChatMessage = (
  unpinChatMessage: IStateUnpinChatMessage
): IActionUnpinChatMessage => ({
  type: UNPIN_CHAT_MESSAGE_RESULT,
  unpinChatMessage: {
    result: unpinChatMessage.result
  }
});

export {
  initialState,
  UNPIN_CHAT_MESSAGE_ERROR,
  UNPIN_CHAT_MESSAGE_QUERY,
  UNPIN_CHAT_MESSAGE_RESULT,
  error,
  query,
  result
};
