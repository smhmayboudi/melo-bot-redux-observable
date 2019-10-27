import { IActionPinChatMessage } from "../../types/iActionPinChatMessage";
import { IStatePinChatMessage } from "../../types/iStatePinChatMessage";
import * as actions from "../actions";

const pinChatMessage: (
  state: IStatePinChatMessage | undefined,
  action: IActionPinChatMessage
) => IStatePinChatMessage = (
  state: IStatePinChatMessage | undefined = actions.pinChatMessage.initialState,
  action: IActionPinChatMessage
): IStatePinChatMessage => {
  switch (action.type) {
    case actions.pinChatMessage.PIN_CHAT_MESSAGE_ERROR:
      return { error: action.pinChatMessage.error, query: state.query };
    case actions.pinChatMessage.PIN_CHAT_MESSAGE_QUERY:
      return { query: action.pinChatMessage.query };
    case actions.pinChatMessage.PIN_CHAT_MESSAGE_RESULT:
      return { query: state.query, result: action.pinChatMessage.result };
    default:
      return state;
  }
};

export { pinChatMessage };
