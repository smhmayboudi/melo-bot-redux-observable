import { IAction } from "./iAction";
import { IStateSetChatStickerSet } from "./iStateSetChatStickerSet";

export interface IActionSetChatStickerSet extends IAction {
  setChatStickerSet: IStateSetChatStickerSet;
}
