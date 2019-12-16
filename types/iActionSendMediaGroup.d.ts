import { IAction } from "./iAction";
import { IStateSendMediaGroup } from "./iStateSendMediaGroup";

export interface IActionSendMediaGroup extends IAction {
  sendMediaGroup: IStateSendMediaGroup;
}
