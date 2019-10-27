import { IActionGetStickerSet } from "../../types/iActionGetStickerSet";
import { IStateGetStickerSet } from "../../types/iStateGetStickerSet";

const initialState: IStateGetStickerSet = {};

const GET_STICKER_SET_ERROR: string = "GET_STICKER_SET_ERROR";
const GET_STICKER_SET_QUERY: string = "GET_STICKER_SET_QUERY";
const GET_STICKER_SET_RESULT: string = "GET_STICKER_SET_RESULT";

const error: (getStickerSet: IStateGetStickerSet) => IActionGetStickerSet = (
  getStickerSet: IStateGetStickerSet
): IActionGetStickerSet => ({
  getStickerSet: {
    error: getStickerSet.error
  },
  type: GET_STICKER_SET_ERROR
});
const query: (getStickerSet: IStateGetStickerSet) => IActionGetStickerSet = (
  getStickerSet: IStateGetStickerSet
): IActionGetStickerSet => ({
  getStickerSet: {
    query: getStickerSet.query
  },
  type: GET_STICKER_SET_QUERY
});
const result: (getStickerSet: IStateGetStickerSet) => IActionGetStickerSet = (
  getStickerSet: IStateGetStickerSet
): IActionGetStickerSet => ({
  getStickerSet: {
    result: getStickerSet.result
  },
  type: GET_STICKER_SET_RESULT
});

export {
  initialState,
  GET_STICKER_SET_ERROR,
  GET_STICKER_SET_QUERY,
  GET_STICKER_SET_RESULT,
  error,
  query,
  result
};
