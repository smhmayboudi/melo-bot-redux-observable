import { Action } from "redux";

import { IStateEditMessageMedia } from "./iStateEditMessageMedia";

export interface IActionEditMessageMedia extends Action<string> {
  editMessageMedia: IStateEditMessageMedia;
}
