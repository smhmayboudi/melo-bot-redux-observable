import { IStateGetUserProfilePhotosQuery } from "./iStateGetUserProfilePhotosQuery";
import { IUserProfilePhotos } from "./telegramBot/types/iUserProfilePhotos";

export interface IStateGetUserProfilePhotos {
  error?: any;
  query?: IStateGetUserProfilePhotosQuery;
  result?: IUserProfilePhotos;
}
