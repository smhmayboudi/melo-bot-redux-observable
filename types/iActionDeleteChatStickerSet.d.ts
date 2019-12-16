import { IAction } from "./iAction";
import { IStateDeleteChatStickerSet } from "./iStateDeleteChatStickerSet";

export interface IActionDeleteChatStickerSet extends IAction {
  deleteChatStickerSet: IStateDeleteChatStickerSet;
}
