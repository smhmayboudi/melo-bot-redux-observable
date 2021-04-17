import { IActionSendPoll } from "../../types/iActionSendPoll";
import { IStateSendPoll } from "../../types/iStateSendPoll";
import * as actions from "../actions";

const sendPoll: (
  state: IStateSendPoll | undefined,
  action: IActionSendPoll
) => IStateSendPoll = (
  state: IStateSendPoll | undefined = actions.sendPoll.initialState,
  action: IActionSendPoll
): IStateSendPoll => {
  switch (action.type) {
    case actions.sendPoll.SEND_POLL_ERROR:
      return { ...state, error: action.sendPoll.error };
    case actions.sendPoll.SEND_POLL_QUERY:
      return { ...state, query: action.sendPoll.query };
    case actions.sendPoll.SEND_POLL_RESULT:
      return { ...state, result: action.sendPoll.result };
    default:
      return state;
  }
};

export { sendPoll };
