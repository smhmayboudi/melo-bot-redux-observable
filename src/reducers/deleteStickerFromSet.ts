import { IActionDeleteStickerFromSet } from "../../types/iActionDeleteStickerFromSet";
import { IStateDeleteStickerFromSet } from "../../types/iStateDeleteStickerFromSet";
import * as actions from "../actions";

const deleteStickerFromSet: (
  state: IStateDeleteStickerFromSet | undefined,
  action: IActionDeleteStickerFromSet
) => IStateDeleteStickerFromSet = (
  state: IStateDeleteStickerFromSet | undefined = actions.deleteStickerFromSet
    .initialState,
  action: IActionDeleteStickerFromSet
): IStateDeleteStickerFromSet => {
  switch (action.type) {
    case actions.deleteStickerFromSet.DELETE_STICKER_FROM_SET_ERROR:
      return { error: action.deleteStickerFromSet.error, query: state.query };
    case actions.deleteStickerFromSet.DELETE_STICKER_FROM_SET_QUERY:
      return { query: action.deleteStickerFromSet.query };
    case actions.deleteStickerFromSet.DELETE_STICKER_FROM_SET_RESULT:
      return { query: state.query, result: action.deleteStickerFromSet.result };
    default:
      return state;
  }
};

export { deleteStickerFromSet };
