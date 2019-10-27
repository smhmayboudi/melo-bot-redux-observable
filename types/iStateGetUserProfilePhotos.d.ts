import { IStateGetUserProfilePhotosQuery } from "./iStateGetUserProfilePhotosQuery";

export interface IStateGetUserProfilePhotos {
  error?: any;
  query?: IStateGetUserProfilePhotosQuery;
  // TODO: check it
  result?: boolean;
}
