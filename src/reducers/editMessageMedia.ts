import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IStateEditMessageMedia } from "../../types/iStateEditMessageMedia";
import * as actions from "../actions";

const editMessageMedia: (
  state: IStateEditMessageMedia | undefined,
  action: IActionEditMessageMedia
) => IStateEditMessageMedia = (
  state: IStateEditMessageMedia | undefined = actions.editMessageMedia
    .initialState,
  action: IActionEditMessageMedia
): IStateEditMessageMedia => {
  switch (action.type) {
    case actions.editMessageMedia.EDIT_MESSAGE_MEDIA_ERROR:
      return { ...state, error: action.editMessageMedia.error };
    case actions.editMessageMedia.EDIT_MESSAGE_MEDIA_QUERY:
      return { ...state, query: action.editMessageMedia.query };
    case actions.editMessageMedia.EDIT_MESSAGE_MEDIA_RESULT:
      return { ...state, result: action.editMessageMedia.result };
    default:
      return state;
  }
};

export { editMessageMedia };
