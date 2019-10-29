import { IActionCreateNewStickerSet } from "../../types/iActionCreateNewStickerSet";
import { IStateCreateNewStickerSet } from "../../types/iStateCreateNewStickerSet";

const initialState: IStateCreateNewStickerSet = {};

const CREATE_NEW_STICKER_SET_ERROR = "CREATE_NEW_STICKER_SET_ERROR";
const CREATE_NEW_STICKER_SET_QUERY = "CREATE_NEW_STICKER_SET_QUERY";
const CREATE_NEW_STICKER_SET_RESULT = "CREATE_NEW_STICKER_SET_RESULT";

const error: (
  createNewStickerSet: IStateCreateNewStickerSet
) => IActionCreateNewStickerSet = (
  createNewStickerSet: IStateCreateNewStickerSet
): IActionCreateNewStickerSet => ({
  createNewStickerSet: {
    error: createNewStickerSet.error
  },
  type: CREATE_NEW_STICKER_SET_ERROR
});
const query: (
  createNewStickerSet: IStateCreateNewStickerSet
) => IActionCreateNewStickerSet = (
  createNewStickerSet: IStateCreateNewStickerSet
): IActionCreateNewStickerSet => ({
  createNewStickerSet: {
    query: createNewStickerSet.query
  },
  type: CREATE_NEW_STICKER_SET_QUERY
});
const result: (
  createNewStickerSet: IStateCreateNewStickerSet
) => IActionCreateNewStickerSet = (
  createNewStickerSet: IStateCreateNewStickerSet
): IActionCreateNewStickerSet => ({
  createNewStickerSet: {
    result: createNewStickerSet.result
  },
  type: CREATE_NEW_STICKER_SET_RESULT
});

export {
  initialState,
  CREATE_NEW_STICKER_SET_ERROR,
  CREATE_NEW_STICKER_SET_QUERY,
  CREATE_NEW_STICKER_SET_RESULT,
  error,
  query,
  result
};
