import { IAction } from "./iAction";
import { IStateGetStickerSet } from "./iStateGetStickerSet";

export interface IActionGetStickerSet extends IAction {
  getStickerSet: IStateGetStickerSet;
}
