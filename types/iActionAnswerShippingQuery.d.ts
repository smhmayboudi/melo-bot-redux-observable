import { IAction } from "./iAction";
import { IStateAnswerShippingQuery } from "./iStateAnswerShippingQuery";

export interface IActionAnswerShippingQuery extends IAction {
  answerShippingQuery: IStateAnswerShippingQuery;
}
