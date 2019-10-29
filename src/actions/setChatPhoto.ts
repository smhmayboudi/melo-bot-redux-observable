import { IActionSetChatPhoto } from "../../types/iActionSetChatPhoto";
import { IStateSetChatPhoto } from "../../types/iStateSetChatPhoto";

const initialState: IStateSetChatPhoto = {};

const SET_CHAT_PHOTO_ERROR = "SET_CHAT_PHOTO_ERROR";
const SET_CHAT_PHOTO_QUERY = "SET_CHAT_PHOTO_QUERY";
const SET_CHAT_PHOTO_RESULT = "SET_CHAT_PHOTO_RESULT";

const error: (setChatPhoto: IStateSetChatPhoto) => IActionSetChatPhoto = (
  setChatPhoto: IStateSetChatPhoto
): IActionSetChatPhoto => ({
  setChatPhoto: {
    error: setChatPhoto.error
  },
  type: SET_CHAT_PHOTO_ERROR
});
const query: (setChatPhoto: IStateSetChatPhoto) => IActionSetChatPhoto = (
  setChatPhoto: IStateSetChatPhoto
): IActionSetChatPhoto => ({
  setChatPhoto: {
    query: setChatPhoto.query
  },
  type: SET_CHAT_PHOTO_QUERY
});
const result: (setChatPhoto: IStateSetChatPhoto) => IActionSetChatPhoto = (
  setChatPhoto: IStateSetChatPhoto
): IActionSetChatPhoto => ({
  setChatPhoto: {
    result: setChatPhoto.result
  },
  type: SET_CHAT_PHOTO_RESULT
});

export {
  initialState,
  SET_CHAT_PHOTO_ERROR,
  SET_CHAT_PHOTO_QUERY,
  SET_CHAT_PHOTO_RESULT,
  error,
  query,
  result
};
