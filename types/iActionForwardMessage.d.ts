import { Action } from "redux";

import { IStateForwardMessage } from "./iStateForwardMessage";

export interface IActionForwardMessage extends Action<string> {
  forwardMessage: IStateForwardMessage;
}
