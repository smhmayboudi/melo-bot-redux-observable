import { IStateGetStickerSetQuery } from "./iStateGetStickerSetQuery";
import { IStickerSet } from "./telegramBot/stickers/iStickerSet";

export interface IStateGetStickerSet {
  error?: any;
  query?: IStateGetStickerSetQuery;
  result?: IStickerSet;
}
