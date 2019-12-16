import { IAction } from "./iAction";
import { IStatePinChatMessage } from "./iStatePinChatMessage";

export interface IActionPinChatMessage extends IAction {
  pinChatMessage: IStatePinChatMessage;
}
