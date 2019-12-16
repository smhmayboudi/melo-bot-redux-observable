import { IAction } from "./iAction";
import { IStateSendAnimation } from "./iStateSendAnimation";

export interface IActionSendAnimation extends IAction {
  sendAnimation: IStateSendAnimation;
}
