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
      return { error: action.getChat.error, query: state.query };
    case actions.getChat.GET_CHAT_QUERY:
      return { query: action.getChat.query };
    case actions.getChat.GET_CHAT_RESULT:
      return { query: state.query, result: action.getChat.result };
    default:
      return state;
  }
};

export { getChat };
