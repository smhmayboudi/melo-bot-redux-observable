import { Action } from "redux";

import { IStateSendAnimation } from "./iStateSendAnimation";

export interface IActionSendAnimation extends Action<string> {
  sendAnimation: IStateSendAnimation;
}
