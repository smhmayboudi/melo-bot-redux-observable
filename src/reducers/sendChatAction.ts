import { IActionSendChatAction } from "../../types/iActionSendChatAction";
import { IStateSendChatAction } from "../../types/iStateSendChatAction";
import * as actions from "../actions";

const sendChatAction: (
  state: IStateSendChatAction | undefined,
  action: IActionSendChatAction
) => IStateSendChatAction = (
  state: IStateSendChatAction | undefined = actions.sendChatAction.initialState,
  action: IActionSendChatAction
): IStateSendChatAction => {
  switch (action.type) {
    case actions.sendChatAction.SEND_CHAT_ACTION_ERROR:
      return { ...state, error: action.sendChatAction.error };
    case actions.sendChatAction.SEND_CHAT_ACTION_QUERY:
      return { ...state, query: action.sendChatAction.query };
    case actions.sendChatAction.SEND_CHAT_ACTION_RESULT:
      return { ...state, result: action.sendChatAction.result };
    default:
      return state;
  }
};

export { sendChatAction };
