import { IAction } from "./iAction";
import { IStateSetWebhook } from "./iStateSetWebhook";

export interface IActionSetWebhook extends IAction {
  setWebhook: IStateSetWebhook;
}
