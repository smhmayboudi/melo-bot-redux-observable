import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IStateEditMessageText } from "../../types/iStateEditMessageText";
import * as actions from "../actions";

const editMessageText: (
  state: IStateEditMessageText | undefined,
  action: IActionEditMessageText
) => IStateEditMessageText = (
  state: IStateEditMessageText | undefined = actions.editMessageText
    .initialState,
  action: IActionEditMessageText
): IStateEditMessageText => {
  switch (action.type) {
    case actions.editMessageText.EDIT_MESSAGE_TEXT_ERROR:
      return { error: action.editMessageText.error, query: state.query };
    case actions.editMessageText.EDIT_MESSAGE_TEXT_QUERY:
      return { query: action.editMessageText.query };
    case actions.editMessageText.EDIT_MESSAGE_TEXT_RESULT:
      return { query: state.query, result: action.editMessageText.result };
    default:
      return state;
  }
};

export { editMessageText };
