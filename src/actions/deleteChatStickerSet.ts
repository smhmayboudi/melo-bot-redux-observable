import { IActionDeleteChatStickerSet } from "../../types/iActionDeleteChatStickerSet";
import { IStateDeleteChatStickerSet } from "../../types/iStateDeleteChatStickerSet";

const initialState: IStateDeleteChatStickerSet = {};

const DELETE_CHAT_STICKER_SET_ERROR = "DELETE_CHAT_STICKER_SET_ERROR";
const DELETE_CHAT_STICKER_SET_QUERY = "DELETE_CHAT_STICKER_SET_QUERY";
const DELETE_CHAT_STICKER_SET_RESULT = "DELETE_CHAT_STICKER_SET_RESULT";

const error: (
  deleteChatStickerSet: IStateDeleteChatStickerSet
) => IActionDeleteChatStickerSet = (
  deleteChatStickerSet: IStateDeleteChatStickerSet
): IActionDeleteChatStickerSet => ({
  deleteChatStickerSet: { error: deleteChatStickerSet.error },
  type: DELETE_CHAT_STICKER_SET_ERROR
});
const query: (
  deleteChatStickerSet: IStateDeleteChatStickerSet
) => IActionDeleteChatStickerSet = (
  deleteChatStickerSet: IStateDeleteChatStickerSet
): IActionDeleteChatStickerSet => ({
  deleteChatStickerSet: { query: deleteChatStickerSet.query },
  type: DELETE_CHAT_STICKER_SET_QUERY
});
const result: (
  deleteChatStickerSet: IStateDeleteChatStickerSet
) => IActionDeleteChatStickerSet = (
  deleteChatStickerSet: IStateDeleteChatStickerSet
): IActionDeleteChatStickerSet => ({
  deleteChatStickerSet: { result: deleteChatStickerSet.result },
  type: DELETE_CHAT_STICKER_SET_RESULT
});

export {
  initialState,
  DELETE_CHAT_STICKER_SET_ERROR,
  DELETE_CHAT_STICKER_SET_QUERY,
  DELETE_CHAT_STICKER_SET_RESULT,
  error,
  query,
  result
};
