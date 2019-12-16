import { IAction } from "./iAction";
import { IStateAnswerInlineQuery } from "./iStateAnswerInlineQuery";

export interface IActionAnswerInlineQuery extends IAction {
  answerInlineQuery: IStateAnswerInlineQuery;
}
