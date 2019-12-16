import { IAction } from "./iAction";
import { IStateSendPhoto } from "./iStateSendPhoto";

export interface IActionSendPhoto extends IAction {
  sendPhoto: IStateSendPhoto;
}
