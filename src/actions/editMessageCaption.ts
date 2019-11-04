import { IActionEditMessageCaption } from "../../types/iActionEditMessageCaption";
import { IStateEditMessageCaption } from "../../types/iStateEditMessageCaption";

const initialState: IStateEditMessageCaption = {};

const EDIT_MESSAGE_CAPTION_ERROR = "EDIT_MESSAGE_CAPTION_ERROR";
const EDIT_MESSAGE_CAPTION_QUERY = "EDIT_MESSAGE_CAPTION_QUERY";
const EDIT_MESSAGE_CAPTION_RESULT = "EDIT_MESSAGE_CAPTION_RESULT";

const error: (
  editMessageCaption: IStateEditMessageCaption
) => IActionEditMessageCaption = (
  editMessageCaption: IStateEditMessageCaption
): IActionEditMessageCaption => ({
  editMessageCaption: { error: editMessageCaption.error },
  type: EDIT_MESSAGE_CAPTION_ERROR
});
const query: (
  editMessageCaption: IStateEditMessageCaption
) => IActionEditMessageCaption = (
  editMessageCaption: IStateEditMessageCaption
): IActionEditMessageCaption => ({
  editMessageCaption: { query: editMessageCaption.query },
  type: EDIT_MESSAGE_CAPTION_QUERY
});
const result: (
  editMessageCaption: IStateEditMessageCaption
) => IActionEditMessageCaption = (
  editMessageCaption: IStateEditMessageCaption
): IActionEditMessageCaption => ({
  editMessageCaption: { result: editMessageCaption.result },
  type: EDIT_MESSAGE_CAPTION_RESULT
});

export {
  initialState,
  EDIT_MESSAGE_CAPTION_ERROR,
  EDIT_MESSAGE_CAPTION_QUERY,
  EDIT_MESSAGE_CAPTION_RESULT,
  error,
  query,
  result
};
