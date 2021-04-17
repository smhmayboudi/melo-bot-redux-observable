import { IPhotoSize } from "./iPhotoSize";

export interface IVideoNote {
  duration: number;
  file_id: string;
  file_size?: number;
  length: number;
  thumb?: IPhotoSize;
}
