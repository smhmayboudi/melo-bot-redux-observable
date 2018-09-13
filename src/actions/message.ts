import { IActionMessage } from "../../types/iActionMessage";
import { IStateMessage } from "../../types/iStateMessage";

const initalState: IStateMessage = {};

const MESSAGE_QUERY: string = "MESSAGE_QUERY";

const query:
  (message: IStateMessage) => IActionMessage =
  (message: IStateMessage): IActionMessage =>
    ({
      message: {
        query: message.query,
      },
      type: MESSAGE_QUERY,
    })
  ;

export {
  initalState,
  MESSAGE_QUERY,
  query,
};
