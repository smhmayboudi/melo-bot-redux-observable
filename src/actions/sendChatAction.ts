import { IActionSendChatAction } from "../../types/iActionSendChatAction";
import { IStateSendChatAction } from "../../types/iStateSendChatAction";

const initialState: IStateSendChatAction = {};

const SEND_CHAT_ACTION_ERROR = "SEND_CHAT_ACTION_ERROR";
const SEND_CHAT_ACTION_QUERY = "SEND_CHAT_ACTION_QUERY";
const SEND_CHAT_ACTION_RESULT = "SEND_CHAT_ACTION_RESULT";

const error: (sendChatAction: IStateSendChatAction) => IActionSendChatAction = (
  sendChatAction: IStateSendChatAction
): IActionSendChatAction => ({
  sendChatAction: { error: sendChatAction.error },
  type: SEND_CHAT_ACTION_ERROR
});
const query: (sendChatAction: IStateSendChatAction) => IActionSendChatAction = (
  sendChatAction: IStateSendChatAction
): IActionSendChatAction => ({
  sendChatAction: { query: sendChatAction.query },
  type: SEND_CHAT_ACTION_QUERY
});
const result: (
  sendChatAction: IStateSendChatAction
) => IActionSendChatAction = (
  sendChatAction: IStateSendChatAction
): IActionSendChatAction => ({
  sendChatAction: { result: sendChatAction.result },
  type: SEND_CHAT_ACTION_RESULT
});

export {
  initialState,
  SEND_CHAT_ACTION_ERROR,
  SEND_CHAT_ACTION_QUERY,
  SEND_CHAT_ACTION_RESULT,
  error,
  query,
  result
};
