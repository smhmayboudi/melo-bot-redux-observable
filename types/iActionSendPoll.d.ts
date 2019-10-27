import { Action } from "redux";

import { IStateSendPoll } from "./iStateSendPoll";

export interface IActionSendPoll extends Action<string> {
  sendPoll: IStateSendPoll;
}
