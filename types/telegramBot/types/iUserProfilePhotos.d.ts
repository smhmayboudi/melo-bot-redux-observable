import { IPhotoSize } from "./iPhotoSize";

export interface IUserProfilePhotos {
  photos: IPhotoSize[][];
  total_count: number;
}