import { Action } from "redux";

import { IStateGetMe } from "./iStateGetMe";

export interface IActionGetMe extends Action<string> {
  getMe: IStateGetMe;
}
