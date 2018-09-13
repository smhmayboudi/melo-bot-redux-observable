import { IMaskPosition } from "./iMaskPosition";
import { IInputFile } from "../types/iInputFile";

export interface createNewStickerSet {
  (
    emojis: string,
    name: string,
    png_sticker: IInputFile | string,
    title: string,
    user_id: number,
    contains_masks?: boolean,
    mask_position?: IMaskPosition,
  ): boolean
}