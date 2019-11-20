import { IStickerSet } from "./iStickerSet";

export interface GetStickerSet {
  (name: string): IStickerSet;
}
