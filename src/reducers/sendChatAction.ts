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
      return { error: action.sendChatAction.error, query: state.query };
    case actions.sendChatAction.SEND_CHAT_ACTION_QUERY:
      return { query: action.sendChatAction.query };
    case actions.sendChatAction.SEND_CHAT_ACTION_RESULT:
      return { query: state.query, result: action.sendChatAction.result };
    default:
      return state;
  }
};

export { sendChatAction };
