import { Action } from "redux";

import { IStateCreateNewStickerSet } from "./iStateCreateNewStickerSet";

export interface IActionCreateNewStickerSet extends Action<string> {
  createNewStickerSet: IStateCreateNewStickerSet;
}
