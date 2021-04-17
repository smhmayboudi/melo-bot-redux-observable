import { IAction } from "./iAction";
import { IStateDeleteStickerFromSet } from "./iStateDeleteStickerFromSet";

export interface IActionDeleteStickerFromSet extends IAction {
  deleteStickerFromSet: IStateDeleteStickerFromSet;
}
