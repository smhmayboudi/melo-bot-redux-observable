import { Action } from "redux";

import { IStateGetStickerSet } from "./iStateGetStickerSet";

export interface IActionGetStickerSet extends Action<string> {
  getStickerSet: IStateGetStickerSet;
}
