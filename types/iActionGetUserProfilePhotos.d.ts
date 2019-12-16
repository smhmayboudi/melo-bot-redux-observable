import { IAction } from "./iAction";
import { IStateGetUserProfilePhotos } from "./iStateGetUserProfilePhotos";

export interface IActionGetUserProfilePhotos extends IAction {
  getUserProfilePhotos: IStateGetUserProfilePhotos;
}
