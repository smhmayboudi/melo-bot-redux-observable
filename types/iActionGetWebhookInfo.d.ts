import { IAction } from "./iAction";
import { IStateGetWebhookInfo } from "./iStateGetWebhookInfo";

export interface IActionGetWebhookInfo extends IAction {
  getWebhookInfo: IStateGetWebhookInfo;
}
