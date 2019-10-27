import { IActionRestrictChatMember } from "../../types/iActionRestrictChatMember";
import { IStateRestrictChatMember } from "../../types/iStateRestrictChatMember";
import * as actions from "../actions";

const restrictChatMember: (
  state: IStateRestrictChatMember | undefined,
  action: IActionRestrictChatMember
) => IStateRestrictChatMember = (
  state: IStateRestrictChatMember | undefined = actions.restrictChatMember
    .initialState,
  action: IActionRestrictChatMember
): IStateRestrictChatMember => {
  switch (action.type) {
    case actions.restrictChatMember.RESTRICT_CHAT_MEMBER_ERROR:
      return { error: action.restrictChatMember.error, query: state.query };
    case actions.restrictChatMember.RESTRICT_CHAT_MEMBER_QUERY:
      return { query: action.restrictChatMember.query };
    case actions.restrictChatMember.RESTRICT_CHAT_MEMBER_RESULT:
      return { query: state.query, result: action.restrictChatMember.result };
    default:
      return state;
  }
};

export { restrictChatMember };
