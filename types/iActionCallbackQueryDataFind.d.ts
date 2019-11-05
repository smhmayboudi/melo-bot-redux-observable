import { Action } from "redux";

import { IStateCallbackQueryDataFind } from "./iStateCallbackQueryDataFind";

export interface IActionCallbackQueryDataFind extends Action<string> {
  callbackQueryDataFind: IStateCallbackQueryDataFind;
}
