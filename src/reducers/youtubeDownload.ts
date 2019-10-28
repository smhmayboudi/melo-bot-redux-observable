import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";
import * as actions from "../actions";

const youtubeDownload: (
  state: IStateYoutubeDownload | undefined,
  action: IActionYoutubeDownload
) => IStateYoutubeDownload = (
  state: IStateYoutubeDownload | undefined = actions.youtubeDownload
    .initialState,
  action: IActionYoutubeDownload
): IStateYoutubeDownload => {
  switch (action.type) {
    case actions.youtubeDownload.YOUTUBE_DOWNLOAD_ERROR:
      return { ...state, error: action.youtubeDownload.error };
    case actions.youtubeDownload.YOUTUBE_DOWNLOAD_QUERY:
      return { ...state, query: action.youtubeDownload.query };
    case actions.youtubeDownload.YOUTUBE_DOWNLOAD_RESULT:
      return { ...state, result: action.youtubeDownload.result };
    default:
      return state;
  }
};

export { youtubeDownload };
