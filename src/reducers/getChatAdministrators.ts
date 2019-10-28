import { IActionGetChatAdministrators } from "../../types/iActionGetChatAdministrators";
import { IStateGetChatAdministrators } from "../../types/iStateGetChatAdministrators";
import * as actions from "../actions";

const getChatAdministrators: (
  state: IStateGetChatAdministrators | undefined,
  action: IActionGetChatAdministrators
) => IStateGetChatAdministrators = (
  state: IStateGetChatAdministrators | undefined = actions.getChatAdministrators
    .initialState,
  action: IActionGetChatAdministrators
): IStateGetChatAdministrators => {
  switch (action.type) {
    case actions.getChatAdministrators.GET_CHAT_ADMINISTRATORS_ERROR:
      return { ...state, error: action.getChatAdministrators.error };
    case actions.getChatAdministrators.GET_CHAT_ADMINISTRATORS_QUERY:
      return { ...state, query: action.getChatAdministrators.query };
    case actions.getChatAdministrators.GET_CHAT_ADMINISTRATORS_RESULT:
      return {
        ...state,
        result: action.getChatAdministrators.result
      };
    default:
      return state;
  }
};

export { getChatAdministrators };
