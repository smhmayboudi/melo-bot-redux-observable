import { IAction } from "./iAction";
import { IStateSetChatTitle } from "./iStateSetChatTitle";

export interface IActionSetChatTitle extends IAction {
  setChatTitle: IStateSetChatTitle;
}
