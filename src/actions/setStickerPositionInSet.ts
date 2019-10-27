import { IActionSetStickerPositionInSet } from "../../types/iActionSetStickerPositionInSet";
import { IStateSetStickerPositionInSet } from "../../types/iStateSetStickerPositionInSet";

const initialState: IStateSetStickerPositionInSet = {};

const SET_STICKER_POSITION_IN_SET_ERROR: string =
  "SET_STICKER_POSITION_IN_SET_ERROR";
const SET_STICKER_POSITION_IN_SET_QUERY: string =
  "SET_STICKER_POSITION_IN_SET_QUERY";
const SET_STICKER_POSITION_IN_SET_RESULT: string =
  "SET_STICKER_POSITION_IN_SET_RESULT";

const error: (
  setStickerPositionInSet: IStateSetStickerPositionInSet
) => IActionSetStickerPositionInSet = (
  setStickerPositionInSet: IStateSetStickerPositionInSet
): IActionSetStickerPositionInSet => ({
  setStickerPositionInSet: {
    error: setStickerPositionInSet.error
  },
  type: SET_STICKER_POSITION_IN_SET_ERROR
});
const query: (
  setStickerPositionInSet: IStateSetStickerPositionInSet
) => IActionSetStickerPositionInSet = (
  setStickerPositionInSet: IStateSetStickerPositionInSet
): IActionSetStickerPositionInSet => ({
  setStickerPositionInSet: {
    query: setStickerPositionInSet.query
  },
  type: SET_STICKER_POSITION_IN_SET_QUERY
});
const result: (
  setStickerPositionInSet: IStateSetStickerPositionInSet
) => IActionSetStickerPositionInSet = (
  setStickerPositionInSet: IStateSetStickerPositionInSet
): IActionSetStickerPositionInSet => ({
  setStickerPositionInSet: {
    result: setStickerPositionInSet.result
  },
  type: SET_STICKER_POSITION_IN_SET_RESULT
});

export {
  initialState,
  SET_STICKER_POSITION_IN_SET_ERROR,
  SET_STICKER_POSITION_IN_SET_QUERY,
  SET_STICKER_POSITION_IN_SET_RESULT,
  error,
  query,
  result
};
