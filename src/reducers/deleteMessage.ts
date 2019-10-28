import { IActionDeleteMessage } from "../../types/iActionDeleteMessage";
import { IStateDeleteMessage } from "../../types/iStateDeleteMessage";
import * as actions from "../actions";

const deleteMessage: (
  state: IStateDeleteMessage | undefined,
  action: IActionDeleteMessage
) => IStateDeleteMessage = (
  state: IStateDeleteMessage | undefined = actions.deleteMessage.initialState,
  action: IActionDeleteMessage
): IStateDeleteMessage => {
  switch (action.type) {
    case actions.deleteMessage.DELETE_MESSAGE_ERROR:
      return { ...state, error: action.deleteMessage.error };
    case actions.deleteMessage.DELETE_MESSAGE_QUERY:
      return { ...state, query: action.deleteMessage.query };
    case actions.deleteMessage.DELETE_MESSAGE_RESULT:
      return { ...state, result: action.deleteMessage.result };
    default:
      return state;
  }
};

export { deleteMessage };
