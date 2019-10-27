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
      return { error: action.editMessageMedia.error, query: state.query };
    case actions.editMessageMedia.EDIT_MESSAGE_MEDIA_QUERY:
      return { query: action.editMessageMedia.query };
    case actions.editMessageMedia.EDIT_MESSAGE_MEDIA_RESULT:
      return { query: state.query, result: action.editMessageMedia.result };
    default:
      return state;
  }
};

export { editMessageMedia };
