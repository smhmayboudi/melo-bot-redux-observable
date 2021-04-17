import { IActionSetStickerPositionInSet } from "../../types/iActionSetStickerPositionInSet";
import { IStateSetStickerPositionInSet } from "../../types/iStateSetStickerPositionInSet";
import * as actions from "../actions";

const setStickerPositionInSet: (
  state: IStateSetStickerPositionInSet | undefined,
  action: IActionSetStickerPositionInSet
) => IStateSetStickerPositionInSet = (
  state: IStateSetStickerPositionInSet | undefined = actions
    .setStickerPositionInSet.initialState,
  action: IActionSetStickerPositionInSet
): IStateSetStickerPositionInSet => {
  switch (action.type) {
    case actions.setStickerPositionInSet.SET_STICKER_POSITION_IN_SET_ERROR:
      return {
        ...state,
        error: action.setStickerPositionInSet.error
      };
    case actions.setStickerPositionInSet.SET_STICKER_POSITION_IN_SET_QUERY:
      return { ...state, query: action.setStickerPositionInSet.query };
    case actions.setStickerPositionInSet.SET_STICKER_POSITION_IN_SET_RESULT:
      return {
        ...state,
        result: action.setStickerPositionInSet.result
      };
    default:
      return state;
  }
};

export { setStickerPositionInSet };
