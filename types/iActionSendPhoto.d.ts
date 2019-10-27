import { Action } from "redux";

import { IStateSendPhoto } from "./iStateSendPhoto";

export interface IActionSendPhoto extends Action<string> {
  sendPhoto: IStateSendPhoto;
}
