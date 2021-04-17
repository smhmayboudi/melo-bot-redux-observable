import { IActionEditMessageCaption } from "../../types/iActionEditMessageCaption";
import { IStateEditMessageCaption } from "../../types/iStateEditMessageCaption";
import * as actions from "../actions";

const editMessageCaption: (
  state: IStateEditMessageCaption | undefined,
  action: IActionEditMessageCaption
) => IStateEditMessageCaption = (
  state: IStateEditMessageCaption | undefined = actions.editMessageCaption
    .initialState,
  action: IActionEditMessageCaption
): IStateEditMessageCaption => {
  switch (action.type) {
    case actions.editMessageCaption.EDIT_MESSAGE_CAPTION_ERROR:
      return { ...state, error: action.editMessageCaption.error };
    case actions.editMessageCaption.EDIT_MESSAGE_CAPTION_QUERY:
      return { ...state, query: action.editMessageCaption.query };
    case actions.editMessageCaption.EDIT_MESSAGE_CAPTION_RESULT:
      return { ...state, result: action.editMessageCaption.result };
    default:
      return state;
  }
};

export { editMessageCaption };
