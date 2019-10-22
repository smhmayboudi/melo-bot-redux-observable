import { Action } from "redux";

import { IStateAnswerInlineQuery } from "./iStateAnswerInlineQuery";

export interface IActionAnswerInlineQuery extends Action<string> {
  answerInlineQuery: IStateAnswerInlineQuery;
}
