import { youtube_v3 } from "googleapis";

import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";

import * as action from "./youtubeVideoList";

describe("youtubeVideoList actions", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeVideoListQuery = {
    key: ""
  };
  const result: youtube_v3.Schema$VideoListResponse = {};

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      type: action.YOUTUBE_VIDEO_LIST_ERROR,
      youtubeVideoList: { error }
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      type: action.YOUTUBE_VIDEO_LIST_QUERY,
      youtubeVideoList: { query }
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      type: action.YOUTUBE_VIDEO_LIST_RESULT,
      youtubeVideoList: { result }
    });
  });
});
