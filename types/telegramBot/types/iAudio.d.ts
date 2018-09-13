import { IPhotoSize } from "./iPhotoSize";

export interface IAudio {
  duration: number;
  file_id: string;
  file_size?: number;
  mime_type?: string;
  performer?: string;
  thumb?: IPhotoSize;
  title?: string;
}