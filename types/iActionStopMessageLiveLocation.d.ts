import { Action } from "redux";

import { IStateStopMessageLiveLocation } from "./iStateStopMessageLiveLocation";

export interface IActionStopMessageLiveLocation extends Action<string> {
  stopMessageLiveLocation: IStateStopMessageLiveLocation;
}
