import { IAction } from "./iAction";
import { IStateDeleteMessage } from "./iStateDeleteMessage";

export interface IActionDeleteMessage extends IAction {
  deleteMessage: IStateDeleteMessage;
}
