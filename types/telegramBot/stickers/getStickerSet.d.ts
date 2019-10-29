import { IStickerSet } from "./iStickerSet";

export interface getStickerSet {
  (name: string): IStickerSet;
}
