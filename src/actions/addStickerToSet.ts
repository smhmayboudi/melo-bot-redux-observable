import { IActionAddStickerToSet } from "../../types/iActionAddStickerToSet";
import { IStateAddStickerToSet } from "../../types/iStateAddStickerToSet";

const initialState: IStateAddStickerToSet = {};

const ADD_STICKER_TO_SET_ERROR = "ADD_STICKER_TO_SET_ERROR";
const ADD_STICKER_TO_SET_QUERY = "ADD_STICKER_TO_SET_QUERY";
const ADD_STICKER_TO_SET_RESULT = "ADD_STICKER_TO_SET_RESULT";

const error: (
  addStickerToSet: IStateAddStickerToSet
) => IActionAddStickerToSet = (
  addStickerToSet: IStateAddStickerToSet
): IActionAddStickerToSet => ({
  addStickerToSet: { error: addStickerToSet.error },
  type: ADD_STICKER_TO_SET_ERROR
});
const query: (
  addStickerToSet: IStateAddStickerToSet
) => IActionAddStickerToSet = (
  addStickerToSet: IStateAddStickerToSet
): IActionAddStickerToSet => ({
  addStickerToSet: { query: addStickerToSet.query },
  type: ADD_STICKER_TO_SET_QUERY
});
const result: (
  addStickerToSet: IStateAddStickerToSet
) => IActionAddStickerToSet = (
  addStickerToSet: IStateAddStickerToSet
): IActionAddStickerToSet => ({
  addStickerToSet: { result: addStickerToSet.result },
  type: ADD_STICKER_TO_SET_RESULT
});

export {
  initialState,
  ADD_STICKER_TO_SET_ERROR,
  ADD_STICKER_TO_SET_QUERY,
  ADD_STICKER_TO_SET_RESULT,
  error,
  query,
  result
};
