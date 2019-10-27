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
      return { error: action.editMessageReplyMarkup.error, query: state.query };
    case actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_QUERY:
      return { query: action.editMessageReplyMarkup.query };
    case actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_RESULT:
      return {
        query: state.query,
        result: action.editMessageReplyMarkup.result
      };
    default:
      return state;
  }
};

export { editMessageReplyMarkup };
