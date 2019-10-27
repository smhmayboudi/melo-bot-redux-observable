import { Action } from "redux";

import { IStateSendVoice } from "./iStateSendVoice";

export interface IActionSendVoice extends Action<string> {
  sendVoice: IStateSendVoice;
}
