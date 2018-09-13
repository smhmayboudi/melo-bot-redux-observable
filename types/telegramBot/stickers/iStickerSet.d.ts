import { ISticker } from "./iSticker";

export interface IStickerSet {
  contains_masks: boolean;
  name: string;
  stickers: ISticker[];
  title: string;
}