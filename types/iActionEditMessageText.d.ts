import { IAction } from "./iAction";
import { IStateEditMessageText } from "./iStateEditMessageText";

export interface IActionEditMessageText extends IAction {
  editMessageText: IStateEditMessageText;
}
