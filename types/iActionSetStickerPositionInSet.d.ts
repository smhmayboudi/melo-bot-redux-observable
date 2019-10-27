import { Action } from "redux";

import { IStateSetStickerPositionInSet } from "./iStateSetStickerPositionInSet";

export interface IActionSetStickerPositionInSet extends Action<string> {
  setStickerPositionInSet: IStateSetStickerPositionInSet;
}
