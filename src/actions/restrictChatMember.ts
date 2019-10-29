import { IActionRestrictChatMember } from "../../types/iActionRestrictChatMember";
import { IStateRestrictChatMember } from "../../types/iStateRestrictChatMember";

const initialState: IStateRestrictChatMember = {};

const RESTRICT_CHAT_MEMBER_ERROR = "RESTRICT_CHAT_MEMBER_ERROR";
const RESTRICT_CHAT_MEMBER_QUERY = "RESTRICT_CHAT_MEMBER_QUERY";
const RESTRICT_CHAT_MEMBER_RESULT = "RESTRICT_CHAT_MEMBER_RESULT";

const error: (
  restrictChatMember: IStateRestrictChatMember
) => IActionRestrictChatMember = (
  restrictChatMember: IStateRestrictChatMember
): IActionRestrictChatMember => ({
  restrictChatMember: {
    error: restrictChatMember.error
  },
  type: RESTRICT_CHAT_MEMBER_ERROR
});
const query: (
  restrictChatMember: IStateRestrictChatMember
) => IActionRestrictChatMember = (
  restrictChatMember: IStateRestrictChatMember
): IActionRestrictChatMember => ({
  restrictChatMember: {
    query: restrictChatMember.query
  },
  type: RESTRICT_CHAT_MEMBER_QUERY
});
const result: (
  restrictChatMember: IStateRestrictChatMember
) => IActionRestrictChatMember = (
  restrictChatMember: IStateRestrictChatMember
): IActionRestrictChatMember => ({
  restrictChatMember: {
    result: restrictChatMember.result
  },
  type: RESTRICT_CHAT_MEMBER_RESULT
});

export {
  initialState,
  RESTRICT_CHAT_MEMBER_ERROR,
  RESTRICT_CHAT_MEMBER_QUERY,
  RESTRICT_CHAT_MEMBER_RESULT,
  error,
  query,
  result
};
