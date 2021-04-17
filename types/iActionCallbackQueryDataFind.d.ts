import { IAction } from "./iAction";
import { IStateCallbackQueryDataFind } from "./iStateCallbackQueryDataFind";

export interface IActionCallbackQueryDataFind extends IAction {
  callbackQueryDataFind: IStateCallbackQueryDataFind;
}
