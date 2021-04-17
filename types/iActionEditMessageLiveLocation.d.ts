import { IAction } from "./iAction";
import { IStateEditMessageLiveLocation } from "./iStateEditMessageLiveLocation";

export interface IActionEditMessageLiveLocation extends IAction {
  editMessageLiveLocation: IStateEditMessageLiveLocation;
}
