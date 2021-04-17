import { IAction } from "./iAction";
import { IStateSetChatDescription } from "./iStateSetChatDescription";

export interface IActionSetChatDescription extends IAction {
  setChatDescription: IStateSetChatDescription;
}
