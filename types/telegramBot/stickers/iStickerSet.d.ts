import { ISticker } from "./iSticker";

export interface IStickerSet {
  contains_masks: boolean;
  is_animated: boolean;
  name: string;
  stickers: ISticker[];
  title: string;
}
