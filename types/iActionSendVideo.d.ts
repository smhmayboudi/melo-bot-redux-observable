import { IAction } from "./iAction";
import { IStateSendVideo } from "./iStateSendVideo";

export interface IActionSendVideo extends IAction {
  sendVideo: IStateSendVideo;
}
