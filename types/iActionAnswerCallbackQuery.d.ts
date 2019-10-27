import { Action } from "redux";

import { IStateAnswerCallbackQuery } from "./iStateAnswerCallbackQuery";

export interface IActionAnswerCallbackQuery extends Action<string> {
  answerCallbackQuery: IStateAnswerCallbackQuery;
}
