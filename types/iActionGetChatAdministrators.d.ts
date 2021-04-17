import { IAction } from "./iAction";
import { IStateGetChatAdministrators } from "./iStateGetChatAdministrators";

export interface IActionGetChatAdministrators extends IAction {
  getChatAdministrators: IStateGetChatAdministrators;
}
