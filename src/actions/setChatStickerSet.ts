import { IActionSetChatStickerSet } from "../../types/iActionSetChatStickerSet";
import { IStateSetChatStickerSet } from "../../types/iStateSetChatStickerSet";

const initialState: IStateSetChatStickerSet = {};

const SET_CHAT_STICKER_SET_ERROR = "SET_CHAT_STICKER_SET_ERROR";
const SET_CHAT_STICKER_SET_QUERY = "SET_CHAT_STICKER_SET_QUERY";
const SET_CHAT_STICKER_SET_RESULT = "SET_CHAT_STICKER_SET_RESULT";

const error: (
  setChatStickerSet: IStateSetChatStickerSet
) => IActionSetChatStickerSet = (
  setChatStickerSet: IStateSetChatStickerSet
): IActionSetChatStickerSet => ({
  setChatStickerSet: {
    error: setChatStickerSet.error
  },
  type: SET_CHAT_STICKER_SET_ERROR
});
const query: (
  setChatStickerSet: IStateSetChatStickerSet
) => IActionSetChatStickerSet = (
  setChatStickerSet: IStateSetChatStickerSet
): IActionSetChatStickerSet => ({
  setChatStickerSet: {
    query: setChatStickerSet.query
  },
  type: SET_CHAT_STICKER_SET_QUERY
});
const result: (
  setChatStickerSet: IStateSetChatStickerSet
) => IActionSetChatStickerSet = (
  setChatStickerSet: IStateSetChatStickerSet
): IActionSetChatStickerSet => ({
  setChatStickerSet: {
    result: setChatStickerSet.result
  },
  type: SET_CHAT_STICKER_SET_RESULT
});

export {
  initialState,
  SET_CHAT_STICKER_SET_ERROR,
  SET_CHAT_STICKER_SET_QUERY,
  SET_CHAT_STICKER_SET_RESULT,
  error,
  query,
  result
};
