import { IAction } from "./iAction";
import { IStateMessage } from "./iStateMessage";

export interface IActionMessage extends IAction {
  message: IStateMessage;
}
