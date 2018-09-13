import { youtube_v3 } from "googleapis";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as action from "./youtubeSearchList";

describe("youtubeSearchList actions", (): void => {

  const error: Error = new Error("");
  const query: IStateYoutubeSearchListQuery = {
    key: "" ,
  };
  const result: youtube_v3.Schema$SearchListResponse = {};

  test("should handle error", (): void => {
    expect(action.error({ error }))
      .toEqual({
        type: action.YOUTUBE_SEARCH_LIST_ERROR,
        youtubeSearchList: { error },
      });
  });

  test("should handle query", (): void => {
    expect(action.query({ query }))
      .toEqual({
        type: action.YOUTUBE_SEARCH_LIST_QUERY,
        youtubeSearchList: { query },
      });
  });

  test("should handle result", (): void => {
    expect(action.result({ result }))
      .toEqual({
        type: action.YOUTUBE_SEARCH_LIST_RESULT,
        youtubeSearchList: { result },
      });
  });

});
