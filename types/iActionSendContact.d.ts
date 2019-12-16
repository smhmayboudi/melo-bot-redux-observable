import { IAction } from "./iAction";
import { IStateSendContact } from "./iStateSendContact";

export interface IActionSendContact extends IAction {
  sendContact: IStateSendContact;
}
