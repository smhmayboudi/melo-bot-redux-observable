import { Action } from "redux";

import { IStateDeleteWebhook } from "./iStateDeleteWebhook";

export interface IActionDeleteWebhook extends Action<string> {
  deleteWebhook: IStateDeleteWebhook;
}
