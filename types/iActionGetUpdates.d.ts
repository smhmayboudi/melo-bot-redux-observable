import { Action } from "redux";

import { IStateGetUpdates } from "./iStateGetUpdates";

export interface IActionGetUpdates extends Action<string> {
  getUpdates: IStateGetUpdates;
}
