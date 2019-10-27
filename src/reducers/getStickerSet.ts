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
      return { error: action.getStickerSet.error, query: state.query };
    case actions.getStickerSet.GET_STICKER_SET_QUERY:
      return { query: action.getStickerSet.query };
    case actions.getStickerSet.GET_STICKER_SET_RESULT:
      return { query: state.query, result: action.getStickerSet.result };
    default:
      return state;
  }
};

export { getStickerSet };
