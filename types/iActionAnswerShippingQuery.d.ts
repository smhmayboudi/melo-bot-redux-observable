import { Action } from "redux";

import { IStateAnswerShippingQuery } from "./iStateAnswerShippingQuery";

export interface IActionAnswerShippingQuery extends Action<string> {
  answerShippingQuery: IStateAnswerShippingQuery;
}
