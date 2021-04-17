import { IAction } from "./iAction";
import { IStateCreateNewStickerSet } from "./iStateCreateNewStickerSet";

export interface IActionCreateNewStickerSet extends IAction {
  createNewStickerSet: IStateCreateNewStickerSet;
}
