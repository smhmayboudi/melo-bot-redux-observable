import { IPhotoSize } from "./iPhotoSize";

export interface IAnimation {
  duration: number;
  file_id: string;
  file_name?: string;
  file_size?: number;
  height: number;
  mime_type?: string;
  thumb?: IPhotoSize;
  width: number;
}
