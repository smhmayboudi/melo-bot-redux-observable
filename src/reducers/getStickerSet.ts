import { IActionGetStickerSet } from "../../types/iActionGetStickerSet";
import { IStateGetStickerSet } from "../../types/iStateGetStickerSet";
import * as actions from "../actions";

const getStickerSet: (
  state: IStateGetStickerSet | undefined,
  action: IActionGetStickerSet
) => IStateGetStickerSet = (
  state: IStateGetStickerSet | undefined = actions.getStickerSet.initialState,
  action: IActionGetStickerSet
): IStateGetStickerSet => {
  switch (action.type) {
    case actions.getStickerSet.GET_STICKER_SET_ERROR:
      return { ...state, error: action.getStickerSet.error };
    case actions.getStickerSet.GET_STICKER_SET_QUERY:
      return { ...state, query: action.getStickerSet.query };
    case actions.getStickerSet.GET_STICKER_SET_RESULT:
      return { ...state, result: action.getStickerSet.result };
    default:
      return state;
  }
};

export { getStickerSet };
