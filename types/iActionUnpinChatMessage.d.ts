import { IAction } from "./iAction";
import { IStateUnpinChatMessage } from "./iStateUnpinChatMessage";

export interface IActionUnpinChatMessage extends IAction {
  unpinChatMessage: IStateUnpinChatMessage;
}
