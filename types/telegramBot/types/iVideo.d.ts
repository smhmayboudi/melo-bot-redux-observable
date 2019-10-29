import { IPhotoSize } from "./iPhotoSize";

export interface IVideo {
  duration: number;
  file_id: string;
  file_size?: number;
  height: number;
  mime_type?: string;
  thumb?: IPhotoSize;
  width: number;
}
