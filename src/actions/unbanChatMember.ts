import { IActionUnbanChatMember } from "../../types/iActionUnbanChatMember";
import { IStateUnbanChatMember } from "../../types/iStateUnbanChatMember";

const initialState: IStateUnbanChatMember = {};

const UNBAN_CHAT_MEMBER_ERROR: string = "UNBAN_CHAT_MEMBER_ERROR";
const UNBAN_CHAT_MEMBER_QUERY: string = "UNBAN_CHAT_MEMBER_QUERY";
const UNBAN_CHAT_MEMBER_RESULT: string = "UNBAN_CHAT_MEMBER_RESULT";

const error: (
  unbanChatMember: IStateUnbanChatMember
) => IActionUnbanChatMember = (
  unbanChatMember: IStateUnbanChatMember
): IActionUnbanChatMember => ({
  type: UNBAN_CHAT_MEMBER_ERROR,
  unbanChatMember: {
    error: unbanChatMember.error
  }
});
const query: (
  unbanChatMember: IStateUnbanChatMember
) => IActionUnbanChatMember = (
  unbanChatMember: IStateUnbanChatMember
): IActionUnbanChatMember => ({
  type: UNBAN_CHAT_MEMBER_QUERY,
  unbanChatMember: {
    query: unbanChatMember.query
  }
});
const result: (
  unbanChatMember: IStateUnbanChatMember
) => IActionUnbanChatMember = (
  unbanChatMember: IStateUnbanChatMember
): IActionUnbanChatMember => ({
  type: UNBAN_CHAT_MEMBER_RESULT,
  unbanChatMember: {
    result: unbanChatMember.result
  }
});

export {
  initialState,
  UNBAN_CHAT_MEMBER_ERROR,
  UNBAN_CHAT_MEMBER_QUERY,
  UNBAN_CHAT_MEMBER_RESULT,
  error,
  query,
  result
};
