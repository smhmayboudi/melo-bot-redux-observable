import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as action from "../actions/youtubeDownload";

import * as reducer from "./youtubeDownload";

describe("youtubeDownload reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadQuery = {
    id: ""
  };
  const result: IStateYoutubeDownloadResultInsertQuery = {
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

  test("should handle initialState", (): void => {
    expect(
      reducer.youtubeDownload(undefined, { youtubeDownload: {}, type: "" })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.youtubeDownload(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.youtubeDownload(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.youtubeDownload(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
