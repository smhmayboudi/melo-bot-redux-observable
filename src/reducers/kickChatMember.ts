import { IActionKickChatMember } from "../../types/iActionKickChatMember";
import { IStateKickChatMember } from "../../types/iStateKickChatMember";
import * as actions from "../actions";

const kickChatMember: (
  state: IStateKickChatMember | undefined,
  action: IActionKickChatMember
) => IStateKickChatMember = (
  state: IStateKickChatMember | undefined = actions.kickChatMember.initialState,
  action: IActionKickChatMember
): IStateKickChatMember => {
  switch (action.type) {
    case actions.kickChatMember.KICK_CHAT_MEMBER_ERROR:
      return { ...state, error: action.kickChatMember.error };
    case actions.kickChatMember.KICK_CHAT_MEMBER_QUERY:
      return { ...state, query: action.kickChatMember.query };
    case actions.kickChatMember.KICK_CHAT_MEMBER_RESULT:
      return { ...state, result: action.kickChatMember.result };
    default:
      return state;
  }
};

export { kickChatMember };
