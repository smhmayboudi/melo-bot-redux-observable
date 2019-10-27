import { IActionLeaveChat } from "../../types/iActionLeaveChat";
import { IStateLeaveChat } from "../../types/iStateLeaveChat";

const initialState: IStateLeaveChat = {};

const LEAVE_CHAT_ERROR: string = "LEAVE_CHAT_ERROR";
const LEAVE_CHAT_QUERY: string = "LEAVE_CHAT_QUERY";
const LEAVE_CHAT_RESULT: string = "LEAVE_CHAT_RESULT";

const error: (leaveChat: IStateLeaveChat) => IActionLeaveChat = (
  leaveChat: IStateLeaveChat
): IActionLeaveChat => ({
  leaveChat: {
    error: leaveChat.error
  },
  type: LEAVE_CHAT_ERROR
});
const query: (leaveChat: IStateLeaveChat) => IActionLeaveChat = (
  leaveChat: IStateLeaveChat
): IActionLeaveChat => ({
  leaveChat: {
    query: leaveChat.query
  },
  type: LEAVE_CHAT_QUERY
});
const result: (leaveChat: IStateLeaveChat) => IActionLeaveChat = (
  leaveChat: IStateLeaveChat
): IActionLeaveChat => ({
  leaveChat: {
    result: leaveChat.result
  },
  type: LEAVE_CHAT_RESULT
});

export {
  initialState,
  LEAVE_CHAT_ERROR,
  LEAVE_CHAT_QUERY,
  LEAVE_CHAT_RESULT,
  error,
  query,
  result
};
