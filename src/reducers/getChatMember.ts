import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import * as actions from "../actions";

const getChatMember:
  (
    state: IStateGetChatMember | undefined,
    action: IActionGetChatMember,
  ) =>
    IStateGetChatMember =
  (
    state: IStateGetChatMember | undefined = actions.getChatMember.initalState,
    action: IActionGetChatMember,
  ):
    IStateGetChatMember => {
    switch (action.type) {
      case actions.getChatMember.GET_CHAT_MEMBER_ERROR:
        return { error: action.getChatMember.error, query: state.query };
      case actions.getChatMember.GET_CHAT_MEMBER_QUERY:
        return { query: action.getChatMember.query };
      case actions.getChatMember.GET_CHAT_MEMBER_RESULT:
        return { query: state.query, result: action.getChatMember.result };
      default:
        return state;
    }
  };

export { getChatMember };
