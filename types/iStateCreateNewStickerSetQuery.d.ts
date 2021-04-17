import { IMaskPosition } from "./telegramBot/stickers/iMaskPosition";
import { IInputFile } from "./telegramBot/types/iInputFile";

export interface IStateCreateNewStickerSetQuery {
  contains_masks?: boolean;
  emojis: string;
  mask_position?: IMaskPosition;
  name: string;
  png_sticker: IInputFile | string;
  title: string;
  user_id: number;
}
