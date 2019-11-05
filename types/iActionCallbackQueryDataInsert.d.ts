import { Action } from "redux";

import { IStateCallbackQueryDataInsert } from "./iStateCallbackQueryDataInsert";

export interface IActionCallbackQueryDataInsert extends Action<string> {
  callbackQueryDataInsert: IStateCallbackQueryDataInsert;
}
