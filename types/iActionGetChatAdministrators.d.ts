import { Action } from "redux";

import { IStateGetChatAdministrators } from "./iStateGetChatAdministrators";

export interface IActionGetChatAdministrators extends Action<string> {
  getChatAdministrators: IStateGetChatAdministrators;
}
