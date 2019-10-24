import { Action } from "redux";

import { IStateChosenInlineResult } from "./iStateChosenInlineResult";

export interface IActionChosenInlineResult extends Action<string> {
  chosenInlineResult: IStateChosenInlineResult;
}
