import { Action } from "redux";

import { IStateSendDocument } from "./iStateSendDocument";

export interface IActionSendDocument extends Action<string> {
  sendDocument: IStateSendDocument;
}
