import { IAction } from "./iAction";
import { IStateSendLocation } from "./iStateSendLocation";

export interface IActionSendLocation extends IAction {
  sendLocation: IStateSendLocation;
}
