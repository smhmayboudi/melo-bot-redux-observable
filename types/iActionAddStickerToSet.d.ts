import { Action } from "redux";

import { IStateAddStickerToSet } from "./iStateAddStickerToSet";

export interface IActionAddStickerToSet extends Action<string> {
  addStickerToSet: IStateAddStickerToSet;
}
