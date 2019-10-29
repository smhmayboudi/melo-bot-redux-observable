import { IActionGetUserProfilePhotos } from "../../types/iActionGetUserProfilePhotos";
import { IStateGetUserProfilePhotos } from "../../types/iStateGetUserProfilePhotos";

const initialState: IStateGetUserProfilePhotos = {};

const GET_USER_PROFILE_PHOTOS_ERROR = "GET_USER_PROFILE_PHOTOS_ERROR";
const GET_USER_PROFILE_PHOTOS_QUERY = "GET_USER_PROFILE_PHOTOS_QUERY";
const GET_USER_PROFILE_PHOTOS_RESULT = "GET_USER_PROFILE_PHOTOS_RESULT";

const error: (
  getUserProfilePhotos: IStateGetUserProfilePhotos
) => IActionGetUserProfilePhotos = (
  getUserProfilePhotos: IStateGetUserProfilePhotos
): IActionGetUserProfilePhotos => ({
  getUserProfilePhotos: {
    error: getUserProfilePhotos.error
  },
  type: GET_USER_PROFILE_PHOTOS_ERROR
});
const query: (
  getUserProfilePhotos: IStateGetUserProfilePhotos
) => IActionGetUserProfilePhotos = (
  getUserProfilePhotos: IStateGetUserProfilePhotos
): IActionGetUserProfilePhotos => ({
  getUserProfilePhotos: {
    query: getUserProfilePhotos.query
  },
  type: GET_USER_PROFILE_PHOTOS_QUERY
});
const result: (
  getUserProfilePhotos: IStateGetUserProfilePhotos
) => IActionGetUserProfilePhotos = (
  getUserProfilePhotos: IStateGetUserProfilePhotos
): IActionGetUserProfilePhotos => ({
  getUserProfilePhotos: {
    result: getUserProfilePhotos.result
  },
  type: GET_USER_PROFILE_PHOTOS_RESULT
});

export {
  initialState,
  GET_USER_PROFILE_PHOTOS_ERROR,
  GET_USER_PROFILE_PHOTOS_QUERY,
  GET_USER_PROFILE_PHOTOS_RESULT,
  error,
  query,
  result
};
