import { IAction } from "./iAction";
import { IStateSendPoll } from "./iStateSendPoll";

export interface IActionSendPoll extends IAction {
  sendPoll: IStateSendPoll;
}
