import { IAction } from "./iAction";
import { IStateSendVenue } from "./iStateSendVenue";

export interface IActionSendVenue extends IAction {
  sendVenue: IStateSendVenue;
}
