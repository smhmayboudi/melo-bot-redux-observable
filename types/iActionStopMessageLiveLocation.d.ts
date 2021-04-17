import { IAction } from "./iAction";
import { IStateStopMessageLiveLocation } from "./iStateStopMessageLiveLocation";

export interface IActionStopMessageLiveLocation extends IAction {
  stopMessageLiveLocation: IStateStopMessageLiveLocation;
}
