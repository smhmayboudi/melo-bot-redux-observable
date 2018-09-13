import { Action } from "redux";
import { IStateMessage } from "./iStateMessage";

export interface IActionMessage extends Action<string> {
  message: IStateMessage;
}