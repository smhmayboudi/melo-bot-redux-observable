import { Action } from "redux";

import { IStateSetChatDescription } from "./iStateSetChatDescription";

export interface IActionSetChatDescription extends Action<string> {
  setChatDescription: IStateSetChatDescription;
}
