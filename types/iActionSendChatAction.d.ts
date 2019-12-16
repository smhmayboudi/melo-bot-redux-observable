import { IAction } from "./iAction";
import { IStateSendChatAction } from "./iStateSendChatAction";

export interface IActionSendChatAction extends IAction {
  sendChatAction: IStateSendChatAction;
}
