import { IActionCreateNewStickerSet } from "../../types/iActionCreateNewStickerSet";
import { IStateCreateNewStickerSet } from "../../types/iStateCreateNewStickerSet";
import * as actions from "../actions";

const createNewStickerSet: (
  state: IStateCreateNewStickerSet | undefined,
  action: IActionCreateNewStickerSet
) => IStateCreateNewStickerSet = (
  state: IStateCreateNewStickerSet | undefined = actions.createNewStickerSet
    .initialState,
  action: IActionCreateNewStickerSet
): IStateCreateNewStickerSet => {
  switch (action.type) {
    case actions.createNewStickerSet.CREATE_NEW_STICKER_SET_ERROR:
      return { error: action.createNewStickerSet.error, query: state.query };
    case actions.createNewStickerSet.CREATE_NEW_STICKER_SET_QUERY:
      return { query: action.createNewStickerSet.query };
    case actions.createNewStickerSet.CREATE_NEW_STICKER_SET_RESULT:
      return { query: state.query, result: action.createNewStickerSet.result };
    default:
      return state;
  }
};

export { createNewStickerSet };
