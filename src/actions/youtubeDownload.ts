import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";

const initialState: IStateYoutubeDownload = {};

const YOUTUBE_DOWNLOAD_ERROR: string = "YOUTUBE_DOWNLOAD_ERROR";
const YOUTUBE_DOWNLOAD_QUERY: string = "YOUTUBE_DOWNLOAD_QUERY";
const YOUTUBE_DOWNLOAD_RESULT: string = "YOUTUBE_DOWNLOAD_RESULT";

const error:
  (youtubeDownload: IStateYoutubeDownload) => IActionYoutubeDownload =
  (youtubeDownload: IStateYoutubeDownload): IActionYoutubeDownload =>
    ({
      type: YOUTUBE_DOWNLOAD_ERROR,
      youtubeDownload: {
        error: youtubeDownload.error,
      },
    })
  ;
const query:
  (youtubeDownload: IStateYoutubeDownload) => IActionYoutubeDownload =
  (youtubeDownload: IStateYoutubeDownload): IActionYoutubeDownload =>
    ({
      type: YOUTUBE_DOWNLOAD_QUERY,
      youtubeDownload: {
        query: youtubeDownload.query,
      },
    })
  ;
const result:
  (youtubeDownload: IStateYoutubeDownload) => IActionYoutubeDownload =
  (youtubeDownload: IStateYoutubeDownload): IActionYoutubeDownload =>
    ({
      type: YOUTUBE_DOWNLOAD_RESULT,
      youtubeDownload: {
        result: youtubeDownload.result,
      },
    })
  ;

export {
  initialState,
  YOUTUBE_DOWNLOAD_ERROR,
  YOUTUBE_DOWNLOAD_QUERY,
  YOUTUBE_DOWNLOAD_RESULT,
  error,
  query,
  result,
};
