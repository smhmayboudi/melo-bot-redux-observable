import { youtube_v3 } from "googleapis";
import { IStateYoutubeVideoListQuery } from "../../types/iStateYoutubeVideoListQuery";
import * as action from "../actions/youtubeVideoList";
import * as reducer from "./youtubeVideoList";

describe("youtubeVideoList reducer", (): void => {

  const error: Error = new Error("");
  const query: IStateYoutubeVideoListQuery = {
    key: "",
  };
  const result: youtube_v3.Schema$VideoListResponse = {};

  test("should handle initialState", (): void => {
    expect(reducer.youtubeVideoList(undefined, { youtubeVideoList: {}, type: "" }))
      .toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(reducer.youtubeVideoList({ ...action.initialState, query }, action.error({ error })))
      .toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(reducer.youtubeVideoList(action.initialState, action.query({ query })))
      .toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(reducer.youtubeVideoList({ ...action.initialState, query }, action.result({ result })))
      .toEqual({ query, result });
  });

});
