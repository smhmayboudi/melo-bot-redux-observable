import { IActionUnbanChatMember } from "../../types/iActionUnbanChatMember";
import { IStateUnbanChatMember } from "../../types/iStateUnbanChatMember";
import * as actions from "../actions";

const unbanChatMember: (
  state: IStateUnbanChatMember | undefined,
  action: IActionUnbanChatMember
) => IStateUnbanChatMember = (
  state: IStateUnbanChatMember | undefined = actions.unbanChatMember
    .initialState,
  action: IActionUnbanChatMember
): IStateUnbanChatMember => {
  switch (action.type) {
    case actions.unbanChatMember.UNBAN_CHAT_MEMBER_ERROR:
      return { error: action.unbanChatMember.error, query: state.query };
    case actions.unbanChatMember.UNBAN_CHAT_MEMBER_QUERY:
      return { query: action.unbanChatMember.query };
    case actions.unbanChatMember.UNBAN_CHAT_MEMBER_RESULT:
      return { query: state.query, result: action.unbanChatMember.result };
    default:
      return state;
  }
};

export { unbanChatMember };
