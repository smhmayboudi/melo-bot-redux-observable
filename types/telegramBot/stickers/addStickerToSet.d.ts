import { IMaskPosition } from "./iMaskPosition";
import { IInputFile } from "../types/iInputFile";

export interface addStickerToSet {
  (
    emojis: string,
    name: string,
    png_sticker: IInputFile | string,
    user_id: number,
    mask_position?: IMaskPosition,
  ): boolean
}