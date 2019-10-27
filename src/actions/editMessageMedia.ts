import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IStateEditMessageMedia } from "../../types/iStateEditMessageMedia";

const initialState: IStateEditMessageMedia = {};

const EDIT_MESSAGE_MEDIA_ERROR: string = "EDIT_MESSAGE_MEDIA_ERROR";
const EDIT_MESSAGE_MEDIA_QUERY: string = "EDIT_MESSAGE_MEDIA_QUERY";
const EDIT_MESSAGE_MEDIA_RESULT: string = "EDIT_MESSAGE_MEDIA_RESULT";

const error: (
  editMessageMedia: IStateEditMessageMedia
) => IActionEditMessageMedia = (
  editMessageMedia: IStateEditMessageMedia
): IActionEditMessageMedia => ({
  editMessageMedia: {
    error: editMessageMedia.error
  },
  type: EDIT_MESSAGE_MEDIA_ERROR
});
const query: (
  editMessageMedia: IStateEditMessageMedia
) => IActionEditMessageMedia = (
  editMessageMedia: IStateEditMessageMedia
): IActionEditMessageMedia => ({
  editMessageMedia: {
    query: editMessageMedia.query
  },
  type: EDIT_MESSAGE_MEDIA_QUERY
});
const result: (
  editMessageMedia: IStateEditMessageMedia
) => IActionEditMessageMedia = (
  editMessageMedia: IStateEditMessageMedia
): IActionEditMessageMedia => ({
  editMessageMedia: {
    result: editMessageMedia.result
  },
  type: EDIT_MESSAGE_MEDIA_RESULT
});

export {
  initialState,
  EDIT_MESSAGE_MEDIA_ERROR,
  EDIT_MESSAGE_MEDIA_QUERY,
  EDIT_MESSAGE_MEDIA_RESULT,
  error,
  query,
  result
};
