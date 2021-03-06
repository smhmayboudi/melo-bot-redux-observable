import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";

import * as action from "./youtubeDownload";

describe("youtubeDownload actions", (): void => {
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

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      type: action.YOUTUBE_DOWNLOAD_ERROR,
      youtubeDownload: { error }
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      type: action.YOUTUBE_DOWNLOAD_QUERY,
      youtubeDownload: { query }
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      type: action.YOUTUBE_DOWNLOAD_RESULT,
      youtubeDownload: { result }
    });
  });
});
