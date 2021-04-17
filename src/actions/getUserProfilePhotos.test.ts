import { IStateGetUserProfilePhotosQuery } from "../../types/iStateGetUserProfilePhotosQuery";
import { IUserProfilePhotos } from "../../types/telegramBot/types/iUserProfilePhotos";

import * as action from "./getUserProfilePhotos";

describe("getUserProfilePhotos actions", (): void => {
  const error: Error = new Error("");
  const query: IStateGetUserProfilePhotosQuery = {
    user_id: 0
  };
  const result: IUserProfilePhotos = {
    photos: [
      [
        {
          file_id: "",
          height: 0,
          width: 0
        }
      ]
    ],
    total_count: 1
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getUserProfilePhotos: { error },
      type: action.GET_USER_PROFILE_PHOTOS_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getUserProfilePhotos: { query },
      type: action.GET_USER_PROFILE_PHOTOS_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getUserProfilePhotos: { result },
      type: action.GET_USER_PROFILE_PHOTOS_RESULT
    });
  });
});
