import { Action } from "redux";

import { IStateGetChat } from "./iStateGetChat";

export interface IActionGetChat extends Action<string> {
  getChat: IStateGetChat;
}
