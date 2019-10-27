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
      return { error: action.editMessageCaption.error, query: state.query };
    case actions.editMessageCaption.EDIT_MESSAGE_CAPTION_QUERY:
      return { query: action.editMessageCaption.query };
    case actions.editMessageCaption.EDIT_MESSAGE_CAPTION_RESULT:
      return { query: state.query, result: action.editMessageCaption.result };
    default:
      return state;
  }
};

export { editMessageCaption };
