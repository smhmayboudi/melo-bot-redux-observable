import { Action } from "redux";

import { IStateEditMessageCaption } from "./iStateEditMessageCaption";

export interface IActionEditMessageCaption extends Action<string> {
  editMessageCaption: IStateEditMessageCaption;
}
