import { IAction } from "./iAction";
import { IStateSetPassportDataErrors } from "./iStateSetPassportDataErrors";

export interface IActionSetPassportDataErrors extends IAction {
  setPassportDataErrors: IStateSetPassportDataErrors;
}
