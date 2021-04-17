import { IActionGetUserProfilePhotos } from "../../types/iActionGetUserProfilePhotos";
import { IStateGetUserProfilePhotos } from "../../types/iStateGetUserProfilePhotos";
import * as actions from "../actions";

const getUserProfilePhotos: (
  state: IStateGetUserProfilePhotos | undefined,
  action: IActionGetUserProfilePhotos
) => IStateGetUserProfilePhotos = (
  state: IStateGetUserProfilePhotos | undefined = actions.getUserProfilePhotos
    .initialState,
  action: IActionGetUserProfilePhotos
): IStateGetUserProfilePhotos => {
  switch (action.type) {
    case actions.getUserProfilePhotos.GET_USER_PROFILE_PHOTOS_ERROR:
      return { ...state, error: action.getUserProfilePhotos.error };
    case actions.getUserProfilePhotos.GET_USER_PROFILE_PHOTOS_QUERY:
      return { ...state, query: action.getUserProfilePhotos.query };
    case actions.getUserProfilePhotos.GET_USER_PROFILE_PHOTOS_RESULT:
      return { ...state, result: action.getUserProfilePhotos.result };
    default:
      return state;
  }
};

export { getUserProfilePhotos };
