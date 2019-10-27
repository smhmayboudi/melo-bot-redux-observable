import { Action } from "redux";

import { IStateDeleteMessage } from "./iStateDeleteMessage";

export interface IActionDeleteMessage extends Action<string> {
  deleteMessage: IStateDeleteMessage;
}
