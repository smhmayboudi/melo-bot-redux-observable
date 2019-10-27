import { IActionDeleteStickerFromSet } from "../../types/iActionDeleteStickerFromSet";
import { IStateDeleteStickerFromSet } from "../../types/iStateDeleteStickerFromSet";

const initialState: IStateDeleteStickerFromSet = {};

const DELETE_STICKER_FROM_SET_ERROR: string = "DELETE_STICKER_FROM_SET_ERROR";
const DELETE_STICKER_FROM_SET_QUERY: string = "DELETE_STICKER_FROM_SET_QUERY";
const DELETE_STICKER_FROM_SET_RESULT: string = "DELETE_STICKER_FROM_SET_RESULT";

const error: (
  deleteStickerFromSet: IStateDeleteStickerFromSet
) => IActionDeleteStickerFromSet = (
  deleteStickerFromSet: IStateDeleteStickerFromSet
): IActionDeleteStickerFromSet => ({
  deleteStickerFromSet: {
    error: deleteStickerFromSet.error
  },
  type: DELETE_STICKER_FROM_SET_ERROR
});
const query: (
  deleteStickerFromSet: IStateDeleteStickerFromSet
) => IActionDeleteStickerFromSet = (
  deleteStickerFromSet: IStateDeleteStickerFromSet
): IActionDeleteStickerFromSet => ({
  deleteStickerFromSet: {
    query: deleteStickerFromSet.query
  },
  type: DELETE_STICKER_FROM_SET_QUERY
});
const result: (
  deleteStickerFromSet: IStateDeleteStickerFromSet
) => IActionDeleteStickerFromSet = (
  deleteStickerFromSet: IStateDeleteStickerFromSet
): IActionDeleteStickerFromSet => ({
  deleteStickerFromSet: {
    result: deleteStickerFromSet.result
  },
  type: DELETE_STICKER_FROM_SET_RESULT
});

export {
  initialState,
  DELETE_STICKER_FROM_SET_ERROR,
  DELETE_STICKER_FROM_SET_QUERY,
  DELETE_STICKER_FROM_SET_RESULT,
  error,
  query,
  result
};
