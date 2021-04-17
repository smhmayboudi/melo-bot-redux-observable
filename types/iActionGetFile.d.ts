import { IAction } from "./iAction";
import { IStateGetFile } from "./iStateGetFile";

export interface IActionGetFile extends IAction {
  getFile: IStateGetFile;
}
