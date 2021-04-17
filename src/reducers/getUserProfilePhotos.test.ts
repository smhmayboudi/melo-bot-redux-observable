import { IStateGetUserProfilePhotosQuery } from "../../types/iStateGetUserProfilePhotosQuery";
import { IUserProfilePhotos } from "../../types/telegramBot/types/iUserProfilePhotos";
import * as action from "../actions/getUserProfilePhotos";

import * as reducer from "./getUserProfilePhotos";

describe("getUserProfilePhotos reducer", (): void => {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.getUserProfilePhotos(undefined, {
        getUserProfilePhotos: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getUserProfilePhotos(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getUserProfilePhotos(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getUserProfilePhotos(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
