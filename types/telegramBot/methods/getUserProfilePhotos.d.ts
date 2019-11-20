import { IUserProfilePhotos } from "../types/iUserProfilePhotos";

export interface GetUserProfilePhotos {
  (user_id: number, limit?: number, offset?: number): IUserProfilePhotos;
}
