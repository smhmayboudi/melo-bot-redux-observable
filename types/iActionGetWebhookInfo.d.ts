import { Action } from "redux";

import { IStateGetWebhookInfo } from "./iStateGetWebhookInfo";

export interface IActionGetWebhookInfo extends Action<string> {
  getWebhookInfo: IStateGetWebhookInfo;
}
