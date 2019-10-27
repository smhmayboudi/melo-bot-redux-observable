import { Action } from "redux";

import { IStateGetFile } from "./iStateGetFile";

export interface IActionGetFile extends Action<string> {
  getFile: IStateGetFile;
}
