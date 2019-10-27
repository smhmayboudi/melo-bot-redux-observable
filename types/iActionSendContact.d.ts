import { Action } from "redux";

import { IStateSendContact } from "./iStateSendContact";

export interface IActionSendContact extends Action<string> {
  sendContact: IStateSendContact;
}
