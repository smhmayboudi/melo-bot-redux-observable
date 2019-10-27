import { Action } from "redux";

import { IStateSendInvoice } from "./iStateSendInvoice";

export interface IActionSendInvoice extends Action<string> {
  sendInvoice: IStateSendInvoice;
}
