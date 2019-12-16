import { IAction } from "./iAction";
import { IStateCallbackQueryDataInsert } from "./iStateCallbackQueryDataInsert";

export interface IActionCallbackQueryDataInsert extends IAction {
  callbackQueryDataInsert: IStateCallbackQueryDataInsert;
}
