import { IActionKickChatMember } from "../../types/iActionKickChatMember";
import { IStateKickChatMember } from "../../types/iStateKickChatMember";

const initialState: IStateKickChatMember = {};

const KICK_CHAT_MEMBER_ERROR: string = "KICK_CHAT_MEMBER_ERROR";
const KICK_CHAT_MEMBER_QUERY: string = "KICK_CHAT_MEMBER_QUERY";
const KICK_CHAT_MEMBER_RESULT: string = "KICK_CHAT_MEMBER_RESULT";

const error: (kickChatMember: IStateKickChatMember) => IActionKickChatMember = (
  kickChatMember: IStateKickChatMember
): IActionKickChatMember => ({
  kickChatMember: {
    error: kickChatMember.error
  },
  type: KICK_CHAT_MEMBER_ERROR
});
const query: (kickChatMember: IStateKickChatMember) => IActionKickChatMember = (
  kickChatMember: IStateKickChatMember
): IActionKickChatMember => ({
  kickChatMember: {
    query: kickChatMember.query
  },
  type: KICK_CHAT_MEMBER_QUERY
});
const result: (
  kickChatMember: IStateKickChatMember
) => IActionKickChatMember = (
  kickChatMember: IStateKickChatMember
): IActionKickChatMember => ({
  kickChatMember: {
    result: kickChatMember.result
  },
  type: KICK_CHAT_MEMBER_RESULT
});

export {
  initialState,
  KICK_CHAT_MEMBER_ERROR,
  KICK_CHAT_MEMBER_QUERY,
  KICK_CHAT_MEMBER_RESULT,
  error,
  query,
  result
};
