import { Action } from "redux";

import { IStateSendVideoNote } from "./iStateSendVideoNote";

export interface IActionSendVideoNote extends Action<string> {
  sendVideoNote: IStateSendVideoNote;
}
