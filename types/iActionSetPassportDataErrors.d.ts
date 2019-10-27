import { Action } from "redux";

import { IStateSetPassportDataErrors } from "./iStateSetPassportDataErrors";

export interface IActionSetPassportDataErrors extends Action<string> {
  setPassportDataErrors: IStateSetPassportDataErrors;
}
