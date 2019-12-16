import { IAction } from "./iAction";
import { IStateEditMessageReplyMarkup } from "./iStateEditMessageReplyMarkup";

export interface IActionEditMessageReplyMarkup extends IAction {
  editMessageReplyMarkup: IStateEditMessageReplyMarkup;
}
