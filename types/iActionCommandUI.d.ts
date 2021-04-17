import { IAction } from "./iAction";
import { IStateCommandUI } from "./iStateCommandUI";

export interface IActionCommandUI extends IAction {
  commandUI: IStateCommandUI;
}
