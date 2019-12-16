import { IAction } from "./iAction";
import { IStateEditMessageCaption } from "./iStateEditMessageCaption";

export interface IActionEditMessageCaption extends IAction {
  editMessageCaption: IStateEditMessageCaption;
}
