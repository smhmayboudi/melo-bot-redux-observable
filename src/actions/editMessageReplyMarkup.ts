import { IActionEditMessageReplyMarkup } from "../../types/iActionEditMessageReplyMarkup";
import { IStateEditMessageReplyMarkup } from "../../types/iStateEditMessageReplyMarkup";

const initialState: IStateEditMessageReplyMarkup = {};

const EDIT_MESSAGE_REPLY_MARKUP_ERROR: string =
  "EDIT_MESSAGE_REPLY_MARKUP_ERROR";
const EDIT_MESSAGE_REPLY_MARKUP_QUERY: string =
  "EDIT_MESSAGE_REPLY_MARKUP_QUERY";
const EDIT_MESSAGE_REPLY_MARKUP_RESULT: string =
  "EDIT_MESSAGE_REPLY_MARKUP_RESULT";

const error: (
  editMessageReplyMarkup: IStateEditMessageReplyMarkup
) => IActionEditMessageReplyMarkup = (
  editMessageReplyMarkup: IStateEditMessageReplyMarkup
): IActionEditMessageReplyMarkup => ({
  editMessageReplyMarkup: {
    error: editMessageReplyMarkup.error
  },
  type: EDIT_MESSAGE_REPLY_MARKUP_ERROR
});
const query: (
  editMessageReplyMarkup: IStateEditMessageReplyMarkup
) => IActionEditMessageReplyMarkup = (
  editMessageReplyMarkup: IStateEditMessageReplyMarkup
): IActionEditMessageReplyMarkup => ({
  editMessageReplyMarkup: {
    query: editMessageReplyMarkup.query
  },
  type: EDIT_MESSAGE_REPLY_MARKUP_QUERY
});
const result: (
  editMessageReplyMarkup: IStateEditMessageReplyMarkup
) => IActionEditMessageReplyMarkup = (
  editMessageReplyMarkup: IStateEditMessageReplyMarkup
): IActionEditMessageReplyMarkup => ({
  editMessageReplyMarkup: {
    result: editMessageReplyMarkup.result
  },
  type: EDIT_MESSAGE_REPLY_MARKUP_RESULT
});

export {
  initialState,
  EDIT_MESSAGE_REPLY_MARKUP_ERROR,
  EDIT_MESSAGE_REPLY_MARKUP_QUERY,
  EDIT_MESSAGE_REPLY_MARKUP_RESULT,
  error,
  query,
  result
};
