import { Action } from "redux";

import { IStateSetChatTitle } from "./iStateSetChatTitle";

export interface IActionSetChatTitle extends Action<string> {
  setChatTitle: IStateSetChatTitle;
}
