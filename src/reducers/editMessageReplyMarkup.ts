import { IActionEditMessageReplyMarkup } from "../../types/iActionEditMessageReplyMarkup";
import { IStateEditMessageReplyMarkup } from "../../types/iStateEditMessageReplyMarkup";
import * as actions from "../actions";

const editMessageReplyMarkup: (
  state: IStateEditMessageReplyMarkup | undefined,
  action: IActionEditMessageReplyMarkup
) => IStateEditMessageReplyMarkup = (
  state: IStateEditMessageReplyMarkup | undefined = actions
    .editMessageReplyMarkup.initialState,
  action: IActionEditMessageReplyMarkup
): IStateEditMessageReplyMarkup => {
  switch (action.type) {
    case actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_ERROR:
      return { ...state, error: action.editMessageReplyMarkup.error };
    case actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_QUERY:
      return { ...state, query: action.editMessageReplyMarkup.query };
    case actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_RESULT:
      return {
        ...state,
        result: action.editMessageReplyMarkup.result
      };
    default:
      return state;
  }
};

export { editMessageReplyMarkup };
