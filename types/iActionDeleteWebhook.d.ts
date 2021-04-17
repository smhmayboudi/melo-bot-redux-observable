import { IAction } from "./iAction";
import { IStateDeleteWebhook } from "./iStateDeleteWebhook";

export interface IActionDeleteWebhook extends IAction {
  deleteWebhook: IStateDeleteWebhook;
}
