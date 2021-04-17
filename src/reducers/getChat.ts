import { IActionGetChat } from "../../types/iActionGetChat";
import { IStateGetChat } from "../../types/iStateGetChat";
import * as actions from "../actions";

const getChat: (
  state: IStateGetChat | undefined,
  action: IActionGetChat
) => IStateGetChat = (
  state: IStateGetChat | undefined = actions.getChat.initialState,
  action: IActionGetChat
): IStateGetChat => {
  switch (action.type) {
    case actions.getChat.GET_CHAT_ERROR:
      return { ...state, error: action.getChat.error };
    case actions.getChat.GET_CHAT_QUERY:
      return { ...state, query: action.getChat.query };
    case actions.getChat.GET_CHAT_RESULT:
      return { ...state, result: action.getChat.result };
    default:
      return state;
  }
};

export { getChat };
