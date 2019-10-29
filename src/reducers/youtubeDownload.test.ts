import { IVideoInfo } from "../../types/libs/iVideoInfo";
import * as action from "../actions/youtubeDownload";

import * as reducer from "./youtubeDownload";

describe("youtubeDownload reducer", (): void => {
  const error: Error = new Error("");
  const query = "";
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
