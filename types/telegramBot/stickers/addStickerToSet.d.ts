import { IMaskPosition } from "./iMaskPosition";
import { IInputFile } from "../types/iInputFile";

export interface AddStickerToSet {
  (
    emojis: string,
    name: string,
    png_sticker: IInputFile | string,
    user_id: number,
    mask_position?: IMaskPosition
  ): boolean;
}
