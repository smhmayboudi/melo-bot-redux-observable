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
      return { error: action.youtubeDownload.error, query: state.query };
    case actions.youtubeDownload.YOUTUBE_DOWNLOAD_QUERY:
      return { query: action.youtubeDownload.query };
    case actions.youtubeDownload.YOUTUBE_DOWNLOAD_RESULT:
      return { query: state.query, result: action.youtubeDownload.result };
    default:
      return state;
  }
};

export { youtubeDownload };
