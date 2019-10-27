import { IActionForwardMessage } from "../../types/iActionForwardMessage";
import { IStateForwardMessage } from "../../types/iStateForwardMessage";
import * as actions from "../actions";

const forwardMessage: (
  state: IStateForwardMessage | undefined,
  action: IActionForwardMessage
) => IStateForwardMessage = (
  state: IStateForwardMessage | undefined = actions.forwardMessage.initialState,
  action: IActionForwardMessage
): IStateForwardMessage => {
  switch (action.type) {
    case actions.forwardMessage.FORWARD_MESSAGE_ERROR:
      return { error: action.forwardMessage.error, query: state.query };
    case actions.forwardMessage.FORWARD_MESSAGE_QUERY:
      return { query: action.forwardMessage.query };
    case actions.forwardMessage.FORWARD_MESSAGE_RESULT:
      return { query: state.query, result: action.forwardMessage.result };
    default:
      return state;
  }
};

export { forwardMessage };
