import { IAction } from "./iAction";
import { IStateForwardMessage } from "./iStateForwardMessage";

export interface IActionForwardMessage extends IAction {
  forwardMessage: IStateForwardMessage;
}
