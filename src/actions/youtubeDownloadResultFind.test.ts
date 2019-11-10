import { IStateYoutubeDownloadResultFindQuery } from "../../types/iStateYoutubeDownloadResultFindQuery";

import * as action from "./youtubeDownloadResultFind";

describe("youtubeDownloadResultFind actions", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultFindQuery = {
    id: ""
  };
  const result = {
    duration: 0,
    file_id: "",
    height: 0,
    id: "",
    title: "",
    width: 0
  };

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      youtubeDownloadResultFind: { error },
      type: action.YOUTUBE_DOWNLOAD_RESULT_FIND_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      youtubeDownloadResultFind: { query },
      type: action.YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      youtubeDownloadResultFind: { result },
      type: action.YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT
    });
  });
});
