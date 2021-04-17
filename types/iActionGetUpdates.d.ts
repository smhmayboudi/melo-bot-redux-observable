import { IAction } from "./iAction";
import { IStateGetUpdates } from "./iStateGetUpdates";

export interface IActionGetUpdates extends IAction {
  getUpdates: IStateGetUpdates;
}
