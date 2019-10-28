import { IActionLeaveChat } from "../../types/iActionLeaveChat";
import { IStateLeaveChat } from "../../types/iStateLeaveChat";
import * as actions from "../actions";

const leaveChat: (
  state: IStateLeaveChat | undefined,
  action: IActionLeaveChat
) => IStateLeaveChat = (
  state: IStateLeaveChat | undefined = actions.leaveChat.initialState,
  action: IActionLeaveChat
): IStateLeaveChat => {
  switch (action.type) {
    case actions.leaveChat.LEAVE_CHAT_ERROR:
      return { ...state, error: action.leaveChat.error };
    case actions.leaveChat.LEAVE_CHAT_QUERY:
      return { ...state, query: action.leaveChat.query };
    case actions.leaveChat.LEAVE_CHAT_RESULT:
      return { ...state, result: action.leaveChat.result };
    default:
      return state;
  }
};

export { leaveChat };
