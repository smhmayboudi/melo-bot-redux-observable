import { Action } from "redux";

import { IStateDeleteStickerFromSet } from "./iStateDeleteStickerFromSet";

export interface IActionDeleteStickerFromSet extends Action<string> {
  deleteStickerFromSet: IStateDeleteStickerFromSet;
}
