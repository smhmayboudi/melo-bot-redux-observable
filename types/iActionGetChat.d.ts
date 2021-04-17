import { IAction } from "./iAction";
import { IStateGetChat } from "./iStateGetChat";

export interface IActionGetChat extends IAction {
  getChat: IStateGetChat;
}
