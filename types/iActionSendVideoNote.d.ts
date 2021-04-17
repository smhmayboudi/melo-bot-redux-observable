import { IAction } from "./iAction";
import { IStateSendVideoNote } from "./iStateSendVideoNote";

export interface IActionSendVideoNote extends IAction {
  sendVideoNote: IStateSendVideoNote;
}
