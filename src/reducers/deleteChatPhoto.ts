import { IActionDeleteChatPhoto } from "../../types/iActionDeleteChatPhoto";
import { IStateDeleteChatPhoto } from "../../types/iStateDeleteChatPhoto";
import * as actions from "../actions";

const deleteChatPhoto: (
  state: IStateDeleteChatPhoto | undefined,
  action: IActionDeleteChatPhoto
) => IStateDeleteChatPhoto = (
  state: IStateDeleteChatPhoto | undefined = actions.deleteChatPhoto
    .initialState,
  action: IActionDeleteChatPhoto
): IStateDeleteChatPhoto => {
  switch (action.type) {
    case actions.deleteChatPhoto.DELETE_CHAT_PHOTO_ERROR:
      return { ...state, error: action.deleteChatPhoto.error };
    case actions.deleteChatPhoto.DELETE_CHAT_PHOTO_QUERY:
      return { ...state, query: action.deleteChatPhoto.query };
    case actions.deleteChatPhoto.DELETE_CHAT_PHOTO_RESULT:
      return { ...state, result: action.deleteChatPhoto.result };
    default:
      return state;
  }
};

export { deleteChatPhoto };
