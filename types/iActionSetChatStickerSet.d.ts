import { Action } from "redux";

import { IStateSetChatStickerSet } from "./iStateSetChatStickerSet";

export interface IActionSetChatStickerSet extends Action<string> {
  setChatStickerSet: IStateSetChatStickerSet;
}
