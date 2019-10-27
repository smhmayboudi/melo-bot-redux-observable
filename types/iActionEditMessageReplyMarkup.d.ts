import { Action } from "redux";

import { IStateEditMessageReplyMarkup } from "./iStateEditMessageReplyMarkup";

export interface IActionEditMessageReplyMarkup extends Action<string> {
  editMessageReplyMarkup: IStateEditMessageReplyMarkup;
}
