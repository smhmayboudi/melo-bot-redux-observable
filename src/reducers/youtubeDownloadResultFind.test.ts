import { IStateYoutubeDownloadResultFindQuery } from "../../types/iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as action from "../actions/youtubeDownloadResultFind";

import * as reducer from "./youtubeDownloadResultFind";

describe("youtubeDownloadResultFind reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultFindQuery = {
    id: ""
  };
  const result: IStateYoutubeDownloadResultInsertQuery | null = {
    duration: 0,
    file_id: "",
    height: 0,
    id: "",
    title: "",
    width: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.youtubeDownloadResultFind(undefined, {
        youtubeDownloadResultFind: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.youtubeDownloadResultFind(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.youtubeDownloadResultFind(
        action.initialState,
        action.query({ query })
      )
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.youtubeDownloadResultFind(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
