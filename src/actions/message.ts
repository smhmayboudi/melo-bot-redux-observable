import { IActionMessage } from "../../types/iActionMessage";
import { IStateMessage } from "../../types/iStateMessage";

const initialState: IStateMessage = {};

const MESSAGE_QUERY = "MESSAGE_QUERY";

const query: (message: IStateMessage) => IActionMessage = (
  message: IStateMessage
): IActionMessage => ({
  message: {
    query: message.query
  },
  type: MESSAGE_QUERY
});

export { initialState, MESSAGE_QUERY, query };
