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
      return { ...state, error: action.sendMediaGroup.error };
    case actions.sendMediaGroup.SEND_MEDIA_GROUP_QUERY:
      return { ...state, query: action.sendMediaGroup.query };
    case actions.sendMediaGroup.SEND_MEDIA_GROUP_RESULT:
      return { ...state, result: action.sendMediaGroup.result };
    default:
      return state;
  }
};

export { sendMediaGroup };
