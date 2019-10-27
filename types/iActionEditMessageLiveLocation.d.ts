import { Action } from "redux";

import { IStateEditMessageLiveLocation } from "./iStateEditMessageLiveLocation";

export interface IActionEditMessageLiveLocation extends Action<string> {
  editMessageLiveLocation: IStateEditMessageLiveLocation;
}
