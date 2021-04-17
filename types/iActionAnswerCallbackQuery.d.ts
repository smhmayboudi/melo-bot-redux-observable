import { IAction } from "./iAction";
import { IStateAnswerCallbackQuery } from "./iStateAnswerCallbackQuery";

export interface IActionAnswerCallbackQuery extends IAction {
  answerCallbackQuery: IStateAnswerCallbackQuery;
}
