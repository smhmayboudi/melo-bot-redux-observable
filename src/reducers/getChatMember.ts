import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import * as actions from "../actions";

const getChatMember: (
  state: IStateGetChatMember | undefined,
  action: IActionGetChatMember
) => IStateGetChatMember = (
  state: IStateGetChatMember | undefined = actions.getChatMember.initialState,
  action: IActionGetChatMember
): IStateGetChatMember => {
  switch (action.type) {
    case actions.getChatMember.GET_CHAT_MEMBER_ERROR:
      return { ...state, error: action.getChatMember.error };
    case actions.getChatMember.GET_CHAT_MEMBER_QUERY:
      return { ...state, query: action.getChatMember.query };
    case actions.getChatMember.GET_CHAT_MEMBER_RESULT:
      return { ...state, result: action.getChatMember.result };
    default:
      return state;
  }
};

export { getChatMember };
