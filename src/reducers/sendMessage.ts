import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import * as actions from "../actions";

const sendMessage:
  (
    state: IStateSendMessage | undefined,
    action: IActionSendMessage,
  ) =>
    IStateSendMessage =
  (
    state: IStateSendMessage | undefined = actions.sendMessage.initalState,
    action: IActionSendMessage,
  ):
    IStateSendMessage => {
    switch (action.type) {
      case actions.sendMessage.SEND_MESSAGE_ERROR:
        return { error: action.sendMessage.error, query: state.query };
      case actions.sendMessage.SEND_MESSAGE_QUERY:
        return { query: action.sendMessage.query };
      case actions.sendMessage.SEND_MESSAGE_RESULT:
        return { query: state.query, result: action.sendMessage.result };
      default:
        return state;
    }
  };

export { sendMessage };
