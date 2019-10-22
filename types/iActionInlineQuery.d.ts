import { Action } from "redux";

import { IStateInlineQuery } from "./iStateInlineQuery";

export interface IActionInlineQuery extends Action<string> {
  inlineQuery: IStateInlineQuery;
}
