import { IActionMessage } from "../../types/iActionMessage";
import { IStateMessage } from "../../types/iStateMessage";
import * as actions from "../actions";

const message: (
  state: IStateMessage | undefined,
  action: IActionMessage
) => IStateMessage = (
  state: IStateMessage | undefined = actions.message.initialState,
  action: IActionMessage
): IStateMessage => {
  switch (action.type) {
    case actions.message.MESSAGE_QUERY:
      return { query: action.message.query };
    default:
      return state;
  }
};

export { message };
