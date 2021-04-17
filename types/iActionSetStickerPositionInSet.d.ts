import { IAction } from "./iAction";
import { IStateSetStickerPositionInSet } from "./iStateSetStickerPositionInSet";

export interface IActionSetStickerPositionInSet extends IAction {
  setStickerPositionInSet: IStateSetStickerPositionInSet;
}
