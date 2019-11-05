import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as action from "../actions/youtubeDownloadResultInsert";

import * as reducer from "./youtubeDownloadResultInsert";

describe("youtubeDownloadResultInsert reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultInsertQuery = {
    duration: 0,
    file_id: "",
    file_size: 0,
    height: 0,
    id: "",
    mime_type: "",
    thumb: {
      file_id: "",
      file_size: 0,
      height: 0,
      width: 0
    },
    title: "",
    width: 0
  };
  const result = "";

  test("should handle initialState", (): void => {
    expect(
      reducer.youtubeDownloadResultInsert(undefined, {
        youtubeDownloadResultInsert: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.youtubeDownloadResultInsert(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.youtubeDownloadResultInsert(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.youtubeDownloadResultInsert(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
