import { Action } from "redux";

import { IStateEditMessageText } from "./iStateEditMessageText";

export interface IActionEditMessageText extends Action<string> {
  editMessageText: IStateEditMessageText;
}
