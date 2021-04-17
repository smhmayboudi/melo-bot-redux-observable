import { IAction } from "./iAction";
import { IStateChosenInlineResult } from "./iStateChosenInlineResult";

export interface IActionChosenInlineResult extends IAction {
  chosenInlineResult: IStateChosenInlineResult;
}
