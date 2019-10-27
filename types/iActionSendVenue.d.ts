import { Action } from "redux";

import { IStateSendVenue } from "./iStateSendVenue";

export interface IActionSendVenue extends Action<string> {
  sendVenue: IStateSendVenue;
}
