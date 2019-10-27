import { IActionAddStickerToSet } from "../../types/iActionAddStickerToSet";
import { IStateAddStickerToSet } from "../../types/iStateAddStickerToSet";
import * as actions from "../actions";

const addStickerToSet: (
  state: IStateAddStickerToSet | undefined,
  action: IActionAddStickerToSet
) => IStateAddStickerToSet = (
  state: IStateAddStickerToSet | undefined = actions.addStickerToSet
    .initialState,
  action: IActionAddStickerToSet
): IStateAddStickerToSet => {
  switch (action.type) {
    case actions.addStickerToSet.ADD_STICKER_TO_SET_ERROR:
      return { error: action.addStickerToSet.error, query: state.query };
    case actions.addStickerToSet.ADD_STICKER_TO_SET_QUERY:
      return { query: action.addStickerToSet.query };
    case actions.addStickerToSet.ADD_STICKER_TO_SET_RESULT:
      return { query: state.query, result: action.addStickerToSet.result };
    default:
      return state;
  }
};

export { addStickerToSet };
