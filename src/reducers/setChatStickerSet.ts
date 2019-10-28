import { IActionSetChatStickerSet } from "../../types/iActionSetChatStickerSet";
import { IStateSetChatStickerSet } from "../../types/iStateSetChatStickerSet";
import * as actions from "../actions";

const setChatStickerSet: (
  state: IStateSetChatStickerSet | undefined,
  action: IActionSetChatStickerSet
) => IStateSetChatStickerSet = (
  state: IStateSetChatStickerSet | undefined = actions.setChatStickerSet
    .initialState,
  action: IActionSetChatStickerSet
): IStateSetChatStickerSet => {
  switch (action.type) {
    case actions.setChatStickerSet.SET_CHAT_STICKER_SET_ERROR:
      return { ...state, error: action.setChatStickerSet.error };
    case actions.setChatStickerSet.SET_CHAT_STICKER_SET_QUERY:
      return { ...state, query: action.setChatStickerSet.query };
    case actions.setChatStickerSet.SET_CHAT_STICKER_SET_RESULT:
      return { ...state, result: action.setChatStickerSet.result };
    default:
      return state;
  }
};

export { setChatStickerSet };
