import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IStateYoutubeDownloadResultInsert } from "../../types/iStateYoutubeDownloadResultInsert";

const initialState: IStateYoutubeDownloadResultInsert = {};

const YOUTUBE_DOWNLOAD_RESULT_INSERT_ERROR =
  "YOUTUBE_DOWNLOAD_RESULT_INSERT_ERROR";
const YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY =
  "YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY";
const YOUTUBE_DOWNLOAD_RESULT_INSERT_RESULT =
  "YOUTUBE_DOWNLOAD_RESULT_INSERT_RESULT";

const error: (
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert
) => IActionYoutubeDownloadResultInsert = (
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert
): IActionYoutubeDownloadResultInsert => ({
  youtubeDownloadResultInsert: { error: youtubeDownloadResultInsert.error },
  type: YOUTUBE_DOWNLOAD_RESULT_INSERT_ERROR
});
const query: (
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert
) => IActionYoutubeDownloadResultInsert = (
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert
): IActionYoutubeDownloadResultInsert => ({
  youtubeDownloadResultInsert: { query: youtubeDownloadResultInsert.query },
  type: YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY
});
const result: (
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert
) => IActionYoutubeDownloadResultInsert = (
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert
): IActionYoutubeDownloadResultInsert => ({
  youtubeDownloadResultInsert: { result: youtubeDownloadResultInsert.result },
  type: YOUTUBE_DOWNLOAD_RESULT_INSERT_RESULT
});

export {
  initialState,
  YOUTUBE_DOWNLOAD_RESULT_INSERT_ERROR,
  YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY,
  YOUTUBE_DOWNLOAD_RESULT_INSERT_RESULT,
  error,
  query,
  result
};
