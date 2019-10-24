import { IVideoInfo } from "../../types/libs/iVideoInfo";

import * as action from "./youtubeDownload";

describe("youtubeDownload actions", (): void => {
  const error: Error = new Error("");
  const query: string = "";
  const result: IVideoInfo = {
    dur: 0,
    fmtList: {
      height: 0,
      itag: 0,
      width: 0
    },
    id: "",
    itag: 0,
    mime: "",
    thumbnailUrl: "",
    title: "",
    url: ""
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
