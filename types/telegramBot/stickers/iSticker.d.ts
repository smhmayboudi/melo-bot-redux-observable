import { IMaskPosition } from "./iMaskPosition";
import { IStickerSet } from "./iStickerSet";
import { IPhotoSize } from "../types/iPhotoSize";

export interface ISticker {
  emoji?: string;
  file_id: string;
  file_size?: number;
  height: number;
  is_animated: boolean;
  mask_position?: IMaskPosition;
  set_name?: string;
  thumb?: IPhotoSize;
  width: number;
}