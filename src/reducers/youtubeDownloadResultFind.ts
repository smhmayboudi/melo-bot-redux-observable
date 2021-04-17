import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IStateYoutubeDownloadResultFind } from "../../types/iStateYoutubeDownloadResultFind";
import * as actions from "../actions";

const youtubeDownloadResultFind: (
  state: IStateYoutubeDownloadResultFind | undefined,
  action: IActionYoutubeDownloadResultFind
) => IStateYoutubeDownloadResultFind = (
  state: IStateYoutubeDownloadResultFind | undefined = actions
    .youtubeDownloadResultFind.initialState,
  action: IActionYoutubeDownloadResultFind
): IStateYoutubeDownloadResultFind => {
  switch (action.type) {
    case actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_ERROR:
      return {
        error: action.youtubeDownloadResultFind.error,
        query: state.query
      };
    case actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_QUERY:
      return { query: action.youtubeDownloadResultFind.query };
    case actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT:
      return {
        query: state.query,
        result: action.youtubeDownloadResultFind.result
      };
    default:
      return state;
  }
};

export { youtubeDownloadResultFind };
