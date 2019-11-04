import { Action } from "redux";

import { IStateCallbackDataInsert } from "./iStateCallbackDataInsert";

export interface IActionCallbackDataInsert extends Action<string> {
  callbackDataInsert: IStateCallbackDataInsert;
}
