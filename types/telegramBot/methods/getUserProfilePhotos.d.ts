import { IUserProfilePhotos } from "../types/iUserProfilePhotos";

export interface getUserProfilePhotos {
  (
    user_id: number,
    limit?: number,
    offset?: number,
  ): IUserProfilePhotos
}