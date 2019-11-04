import { Action } from "redux";

import { IStateCallbackDataFind } from "./iStateCallbackDataFind";

export interface IActionCallbackDataFind extends Action<string> {
  callbackDataFind: IStateCallbackDataFind;
}
