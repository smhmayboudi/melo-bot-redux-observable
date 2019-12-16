import { IAction } from "./iAction";
import { IStateAddStickerToSet } from "./iStateAddStickerToSet";

export interface IActionAddStickerToSet extends IAction {
  addStickerToSet: IStateAddStickerToSet;
}
