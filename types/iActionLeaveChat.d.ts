import { IAction } from "./iAction";
import { IStateLeaveChat } from "./iStateLeaveChat";

export interface IActionLeaveChat extends IAction {
  leaveChat: IStateLeaveChat;
}
