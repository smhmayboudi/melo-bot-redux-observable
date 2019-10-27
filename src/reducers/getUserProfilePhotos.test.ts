import { IStateGetUserProfilePhotosQuery } from "../../types/iStateGetUserProfilePhotosQuery";
import * as action from "../actions/getUserProfilePhotos";

import * as reducer from "./getUserProfilePhotos";

describe("getUserProfilePhotos reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetUserProfilePhotosQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;

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
