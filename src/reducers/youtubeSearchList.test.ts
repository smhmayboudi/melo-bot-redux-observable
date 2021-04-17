import { youtube_v3 } from "googleapis";

import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as action from "../actions/youtubeSearchList";

import * as reducer from "./youtubeSearchList";

describe("youtubeSearchList reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeSearchListQuery = {
    key: ""
  };
  const result: youtube_v3.Schema$SearchListResponse = {};

  test("should handle initialState", (): void => {
    expect(
      reducer.youtubeSearchList(undefined, { youtubeSearchList: {}, type: "" })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.youtubeSearchList(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.youtubeSearchList(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.youtubeSearchList(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
