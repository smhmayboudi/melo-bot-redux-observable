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
      return { error: action.sendPoll.error, query: state.query };
    case actions.sendPoll.SEND_POLL_QUERY:
      return { query: action.sendPoll.query };
    case actions.sendPoll.SEND_POLL_RESULT:
      return { query: state.query, result: action.sendPoll.result };
    default:
      return state;
  }
};

export { sendPoll };
