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
      return { ...state, error: action.pinChatMessage.error };
    case actions.pinChatMessage.PIN_CHAT_MESSAGE_QUERY:
      return { ...state, query: action.pinChatMessage.query };
    case actions.pinChatMessage.PIN_CHAT_MESSAGE_RESULT:
      return { ...state, result: action.pinChatMessage.result };
    default:
      return state;
  }
};

export { pinChatMessage };
