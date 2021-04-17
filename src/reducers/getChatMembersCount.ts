import { IActionGetChatMembersCount } from "../../types/iActionGetChatMembersCount";
import { IStateGetChatMembersCount } from "../../types/iStateGetChatMembersCount";
import * as actions from "../actions";

const getChatMembersCount: (
  state: IStateGetChatMembersCount | undefined,
  action: IActionGetChatMembersCount
) => IStateGetChatMembersCount = (
  state: IStateGetChatMembersCount | undefined = actions.getChatMembersCount
    .initialState,
  action: IActionGetChatMembersCount
): IStateGetChatMembersCount => {
  switch (action.type) {
    case actions.getChatMembersCount.GET_CHAT_MEMBERS_COUNT_ERROR:
      return { ...state, error: action.getChatMembersCount.error };
    case actions.getChatMembersCount.GET_CHAT_MEMBERS_COUNT_QUERY:
      return { ...state, query: action.getChatMembersCount.query };
    case actions.getChatMembersCount.GET_CHAT_MEMBERS_COUNT_RESULT:
      return { ...state, result: action.getChatMembersCount.result };
    default:
      return state;
  }
};

export { getChatMembersCount };
