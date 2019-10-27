import { Action } from "redux";

import { IStateGetUserProfilePhotos } from "./iStateGetUserProfilePhotos";

export interface IActionGetUserProfilePhotos extends Action<string> {
  getUserProfilePhotos: IStateGetUserProfilePhotos;
}
