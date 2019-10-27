import { Action } from "redux";

import { IStateStopPoll } from "./iStateStopPoll";

export interface IActionStopPoll extends Action<string> {
  stopPoll: IStateStopPoll;
}
