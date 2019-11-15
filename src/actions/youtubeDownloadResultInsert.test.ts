import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";

import * as action from "./youtubeDownloadResultInsert";

describe("youtubeDownloadResultInsert actions", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultInsertQuery | null = {
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

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      youtubeDownloadResultInsert: { error },
      type: action.YOUTUBE_DOWNLOAD_RESULT_INSERT_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      youtubeDownloadResultInsert: { query },
      type: action.YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      youtubeDownloadResultInsert: { result },
      type: action.YOUTUBE_DOWNLOAD_RESULT_INSERT_RESULT
    });
  });
});
