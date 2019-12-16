import { IAction } from "./iAction";
import { IStateStopPoll } from "./iStateStopPoll";

export interface IActionStopPoll extends IAction {
  stopPoll: IStateStopPoll;
}
