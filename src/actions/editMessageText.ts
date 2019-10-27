import { IActionEditMessageText } from "../../types/iActionEditMessageText";
import { IStateEditMessageText } from "../../types/iStateEditMessageText";

const initialState: IStateEditMessageText = {};

const EDIT_MESSAGE_TEXT_ERROR: string = "EDIT_MESSAGE_TEXT_ERROR";
const EDIT_MESSAGE_TEXT_QUERY: string = "EDIT_MESSAGE_TEXT_QUERY";
const EDIT_MESSAGE_TEXT_RESULT: string = "EDIT_MESSAGE_TEXT_RESULT";

const error: (
  editMessageText: IStateEditMessageText
) => IActionEditMessageText = (
  editMessageText: IStateEditMessageText
): IActionEditMessageText => ({
  editMessageText: {
    error: editMessageText.error
  },
  type: EDIT_MESSAGE_TEXT_ERROR
});
const query: (
  editMessageText: IStateEditMessageText
) => IActionEditMessageText = (
  editMessageText: IStateEditMessageText
): IActionEditMessageText => ({
  editMessageText: {
    query: editMessageText.query
  },
  type: EDIT_MESSAGE_TEXT_QUERY
});
const result: (
  editMessageText: IStateEditMessageText
) => IActionEditMessageText = (
  editMessageText: IStateEditMessageText
): IActionEditMessageText => ({
  editMessageText: {
    result: editMessageText.result
  },
  type: EDIT_MESSAGE_TEXT_RESULT
});

export {
  initialState,
  EDIT_MESSAGE_TEXT_ERROR,
  EDIT_MESSAGE_TEXT_QUERY,
  EDIT_MESSAGE_TEXT_RESULT,
  error,
  query,
  result
};
