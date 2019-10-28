import { IActionSetChatPhoto } from "../../types/iActionSetChatPhoto";
import { IStateSetChatPhoto } from "../../types/iStateSetChatPhoto";
import * as actions from "../actions";

const setChatPhoto: (
  state: IStateSetChatPhoto | undefined,
  action: IActionSetChatPhoto
) => IStateSetChatPhoto = (
  state: IStateSetChatPhoto | undefined = actions.setChatPhoto.initialState,
  action: IActionSetChatPhoto
): IStateSetChatPhoto => {
  switch (action.type) {
    case actions.setChatPhoto.SET_CHAT_PHOTO_ERROR:
      return { ...state, error: action.setChatPhoto.error };
    case actions.setChatPhoto.SET_CHAT_PHOTO_QUERY:
      return { ...state, query: action.setChatPhoto.query };
    case actions.setChatPhoto.SET_CHAT_PHOTO_RESULT:
      return { ...state, result: action.setChatPhoto.result };
    default:
      return state;
  }
};

export { setChatPhoto };
