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
      return { error: action.deleteChatStickerSet.error, query: state.query };
    case actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_QUERY:
      return { query: action.deleteChatStickerSet.query };
    case actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_RESULT:
      return { query: state.query, result: action.deleteChatStickerSet.result };
    default:
      return state;
  }
};

export { deleteChatStickerSet };
