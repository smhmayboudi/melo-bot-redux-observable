import { Action } from "redux";

import { IStateAnswerPreCheckoutQuery } from "./iStateAnswerPreCheckoutQuery";

export interface IActionAnswerPreCheckoutQuery extends Action<string> {
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery;
}
