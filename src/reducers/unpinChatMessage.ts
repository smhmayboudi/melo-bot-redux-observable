import { IActionUnpinChatMessage } from "../../types/iActionUnpinChatMessage";
import { IStateUnpinChatMessage } from "../../types/iStateUnpinChatMessage";
import * as actions from "../actions";

const unpinChatMessage: (
  state: IStateUnpinChatMessage | undefined,
  action: IActionUnpinChatMessage
) => IStateUnpinChatMessage = (
  state: IStateUnpinChatMessage | undefined = actions.unpinChatMessage
    .initialState,
  action: IActionUnpinChatMessage
): IStateUnpinChatMessage => {
  switch (action.type) {
    case actions.unpinChatMessage.UNPIN_CHAT_MESSAGE_ERROR:
      return { ...state, error: action.unpinChatMessage.error };
    case actions.unpinChatMessage.UNPIN_CHAT_MESSAGE_QUERY:
      return { ...state, query: action.unpinChatMessage.query };
    case actions.unpinChatMessage.UNPIN_CHAT_MESSAGE_RESULT:
      return { ...state, result: action.unpinChatMessage.result };
    default:
      return state;
  }
};

export { unpinChatMessage };
