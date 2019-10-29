import { Action } from "redux";
import { IStateSendVideo } from "./iStateSendVideo";

export interface IActionSendVideo extends Action<string> {
  sendVideo: IStateSendVideo;
}
