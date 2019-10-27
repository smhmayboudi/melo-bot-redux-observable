import { IActionSendMediaGroup } from "../../types/iActionSendMediaGroup";
import { IStateSendMediaGroup } from "../../types/iStateSendMediaGroup";
import * as actions from "../actions";

const sendMediaGroup: (
  state: IStateSendMediaGroup | undefined,
  action: IActionSendMediaGroup
) => IStateSendMediaGroup = (
  state: IStateSendMediaGroup | undefined = actions.sendMediaGroup.initialState,
  action: IActionSendMediaGroup
): IStateSendMediaGroup => {
  switch (action.type) {
    case actions.sendMediaGroup.SEND_MEDIA_GROUP_ERROR:
      return { error: action.sendMediaGroup.error, query: state.query };
    case actions.sendMediaGroup.SEND_MEDIA_GROUP_QUERY:
      return { query: action.sendMediaGroup.query };
    case actions.sendMediaGroup.SEND_MEDIA_GROUP_RESULT:
      return { query: state.query, result: action.sendMediaGroup.result };
    default:
      return state;
  }
};

export { sendMediaGroup };
