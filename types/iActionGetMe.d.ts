import { IAction } from "./iAction";
import { IStateGetMe } from "./iStateGetMe";

export interface IActionGetMe extends IAction {
  getMe: IStateGetMe;
}
