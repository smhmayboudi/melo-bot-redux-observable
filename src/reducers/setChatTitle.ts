import { IActionSetChatTitle } from "../../types/iActionSetChatTitle";
import { IStateSetChatTitle } from "../../types/iStateSetChatTitle";
import * as actions from "../actions";

const setChatTitle: (
  state: IStateSetChatTitle | undefined,
  action: IActionSetChatTitle
) => IStateSetChatTitle = (
  state: IStateSetChatTitle | undefined = actions.setChatTitle.initialState,
  action: IActionSetChatTitle
): IStateSetChatTitle => {
  switch (action.type) {
    case actions.setChatTitle.SET_CHAT_TITLE_ERROR:
      return { error: action.setChatTitle.error, query: state.query };
    case actions.setChatTitle.SET_CHAT_TITLE_QUERY:
      return { query: action.setChatTitle.query };
    case actions.setChatTitle.SET_CHAT_TITLE_RESULT:
      return { query: state.query, result: action.setChatTitle.result };
    default:
      return state;
  }
};

export { setChatTitle };
