import { Action } from "redux";

import { IStateDeleteChatStickerSet } from "./iStateDeleteChatStickerSet";

export interface IActionDeleteChatStickerSet extends Action<string> {
  deleteChatStickerSet: IStateDeleteChatStickerSet;
}
