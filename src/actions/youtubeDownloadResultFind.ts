import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IStateYoutubeDownloadResultFind } from "../../types/iStateYoutubeDownloadResultFind";

const initialState: IStateYoutubeDownloadResultFind = {};

const YOUTUBE_DOWNLOAD_RESULT_FIND_ERROR = "YOUTUBE_DOWNLOAD_RESULT_FIND_ERROR";
const YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY = "YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY";
const YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT =
  "YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT";

const error: (
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind
) => IActionYoutubeDownloadResultFind = (
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind
): IActionYoutubeDownloadResultFind => ({
  youtubeDownloadResultFind: { error: youtubeDownloadResultFind.error },
  type: YOUTUBE_DOWNLOAD_RESULT_FIND_ERROR
});
const query: (
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind
) => IActionYoutubeDownloadResultFind = (
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind
): IActionYoutubeDownloadResultFind => ({
  youtubeDownloadResultFind: { query: youtubeDownloadResultFind.query },
  type: YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY
});
const result: (
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind
) => IActionYoutubeDownloadResultFind = (
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind
): IActionYoutubeDownloadResultFind => ({
  youtubeDownloadResultFind: { result: youtubeDownloadResultFind.result },
  type: YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT
});

export {
  initialState,
  YOUTUBE_DOWNLOAD_RESULT_FIND_ERROR,
  YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY,
  YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT,
  error,
  query,
  result
};
