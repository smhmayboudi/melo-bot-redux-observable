import { IMaskPosition } from "./telegramBot/stickers/iMaskPosition";
import { IInputFile } from "./telegramBot/types/iInputFile";

export interface IStateAddStickerToSetQuery {
  emojis: string;
  mask_position?: IMaskPosition;
  name: string;
  png_sticker: IInputFile | string;
  user_id: number;
}
