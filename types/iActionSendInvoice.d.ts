import { IAction } from "./iAction";
import { IStateSendInvoice } from "./iStateSendInvoice";

export interface IActionSendInvoice extends IAction {
  sendInvoice: IStateSendInvoice;
}
