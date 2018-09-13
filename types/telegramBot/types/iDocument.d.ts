import { IPhotoSize } from "./iPhotoSize";

export interface IDocument {
  file_id: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  thumb?: IPhotoSize;
}