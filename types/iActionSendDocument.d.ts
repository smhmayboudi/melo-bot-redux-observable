import { IAction } from "./iAction";
import { IStateSendDocument } from "./iStateSendDocument";

export interface IActionSendDocument extends IAction {
  sendDocument: IStateSendDocument;
}
