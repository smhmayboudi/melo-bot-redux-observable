import { Action } from "redux";

import { IStateSetWebhook } from "./iStateSetWebhook";

export interface IActionSetWebhook extends Action<string> {
  setWebhook: IStateSetWebhook;
}
