import { IAction } from "./iAction";
import { IStateInlineQuery } from "./iStateInlineQuery";

export interface IActionInlineQuery extends IAction {
  inlineQuery: IStateInlineQuery;
}
