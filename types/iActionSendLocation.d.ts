import { Action } from "redux";

import { IStateSendLocation } from "./iStateSendLocation";

export interface IActionSendLocation extends Action<string> {
  sendLocation: IStateSendLocation;
}
