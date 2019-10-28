import { IActionDeleteChatStickerSet } from "../../types/iActionDeleteChatStickerSet";
import { IStateDeleteChatStickerSet } from "../../types/iStateDeleteChatStickerSet";
import * as actions from "../actions";

const deleteChatStickerSet: (
  state: IStateDeleteChatStickerSet | undefined,
  action: IActionDeleteChatStickerSet
) => IStateDeleteChatStickerSet = (
  state: IStateDeleteChatStickerSet | undefined = actions.deleteChatStickerSet
    .initialState,
  action: IActionDeleteChatStickerSet
): IStateDeleteChatStickerSet => {
  switch (action.type) {
    case actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_ERROR:
      return { ...state, error: action.deleteChatStickerSet.error };
    case actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_QUERY:
      return { ...state, query: action.deleteChatStickerSet.query };
    case actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_RESULT:
      return { ...state, result: action.deleteChatStickerSet.result };
    default:
      return state;
  }
};

export { deleteChatStickerSet };
