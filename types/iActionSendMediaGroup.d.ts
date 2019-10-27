import { Action } from "redux";

import { IStateSendMediaGroup } from "./iStateSendMediaGroup";

export interface IActionSendMediaGroup extends Action<string> {
  sendMediaGroup: IStateSendMediaGroup;
}
