import { IAction } from "./iAction";
import { IStateSendMessage } from "./iStateSendMessage";

export interface IActionSendMessage extends IAction {
  sendMessage: IStateSendMessage;
}
