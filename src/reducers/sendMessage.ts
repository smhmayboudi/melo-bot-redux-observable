import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import * as actions from "../actions";

const sendMessage: (
  state: IStateSendMessage | undefined,
  action: IActionSendMessage
) => IStateSendMessage = (
  state: IStateSendMessage | undefined = actions.sendMessage.initialState,
  action: IActionSendMessage
): IStateSendMessage => {
  switch (action.type) {
    case actions.sendMessage.SEND_MESSAGE_ERROR:
      return { ...state, error: action.sendMessage.error };
    case actions.sendMessage.SEND_MESSAGE_QUERY:
      return { ...state, query: action.sendMessage.query };
    case actions.sendMessage.SEND_MESSAGE_RESULT:
      return { ...state, result: action.sendMessage.result };
    default:
      return state;
  }
};

export { sendMessage };
