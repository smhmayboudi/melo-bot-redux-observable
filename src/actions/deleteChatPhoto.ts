import { IActionDeleteChatPhoto } from "../../types/iActionDeleteChatPhoto";
import { IStateDeleteChatPhoto } from "../../types/iStateDeleteChatPhoto";

const initialState: IStateDeleteChatPhoto = {};

const DELETE_CHAT_PHOTO_ERROR: string = "DELETE_CHAT_PHOTO_ERROR";
const DELETE_CHAT_PHOTO_QUERY: string = "DELETE_CHAT_PHOTO_QUERY";
const DELETE_CHAT_PHOTO_RESULT: string = "DELETE_CHAT_PHOTO_RESULT";

const error: (
  deleteChatPhoto: IStateDeleteChatPhoto
) => IActionDeleteChatPhoto = (
  deleteChatPhoto: IStateDeleteChatPhoto
): IActionDeleteChatPhoto => ({
  deleteChatPhoto: {
    error: deleteChatPhoto.error
  },
  type: DELETE_CHAT_PHOTO_ERROR
});
const query: (
  deleteChatPhoto: IStateDeleteChatPhoto
) => IActionDeleteChatPhoto = (
  deleteChatPhoto: IStateDeleteChatPhoto
): IActionDeleteChatPhoto => ({
  deleteChatPhoto: {
    query: deleteChatPhoto.query
  },
  type: DELETE_CHAT_PHOTO_QUERY
});
const result: (
  deleteChatPhoto: IStateDeleteChatPhoto
) => IActionDeleteChatPhoto = (
  deleteChatPhoto: IStateDeleteChatPhoto
): IActionDeleteChatPhoto => ({
  deleteChatPhoto: {
    result: deleteChatPhoto.result
  },
  type: DELETE_CHAT_PHOTO_RESULT
});

export {
  initialState,
  DELETE_CHAT_PHOTO_ERROR,
  DELETE_CHAT_PHOTO_QUERY,
  DELETE_CHAT_PHOTO_RESULT,
  error,
  query,
  result
};
