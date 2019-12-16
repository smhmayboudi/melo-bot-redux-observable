import { IAction } from "./iAction";
import { IStateAnswerPreCheckoutQuery } from "./iStateAnswerPreCheckoutQuery";

export interface IActionAnswerPreCheckoutQuery extends IAction {
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery;
}
