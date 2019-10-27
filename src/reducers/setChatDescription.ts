import { IActionSetChatDescription } from "../../types/iActionSetChatDescription";
import { IStateSetChatDescription } from "../../types/iStateSetChatDescription";
import * as actions from "../actions";

const setChatDescription: (
  state: IStateSetChatDescription | undefined,
  action: IActionSetChatDescription
) => IStateSetChatDescription = (
  state: IStateSetChatDescription | undefined = actions.setChatDescription
    .initialState,
  action: IActionSetChatDescription
): IStateSetChatDescription => {
  switch (action.type) {
    case actions.setChatDescription.SET_CHAT_DESCRIPTION_ERROR:
      return { error: action.setChatDescription.error, query: state.query };
    case actions.setChatDescription.SET_CHAT_DESCRIPTION_QUERY:
      return { query: action.setChatDescription.query };
    case actions.setChatDescription.SET_CHAT_DESCRIPTION_RESULT:
      return { query: state.query, result: action.setChatDescription.result };
    default:
      return state;
  }
};

export { setChatDescription };
