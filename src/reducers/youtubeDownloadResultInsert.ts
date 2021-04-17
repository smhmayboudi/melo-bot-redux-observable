import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IStateYoutubeDownloadResultInsert } from "../../types/iStateYoutubeDownloadResultInsert";
import * as actions from "../actions";

const youtubeDownloadResultInsert: (
  state: IStateYoutubeDownloadResultInsert | undefined,
  action: IActionYoutubeDownloadResultInsert
) => IStateYoutubeDownloadResultInsert = (
  state: IStateYoutubeDownloadResultInsert | undefined = actions
    .youtubeDownloadResultInsert.initialState,
  action: IActionYoutubeDownloadResultInsert
): IStateYoutubeDownloadResultInsert => {
  switch (action.type) {
    case actions.youtubeDownloadResultInsert
      .YOUTUBE_DOWNLOAD_RESULT_INSERT_ERROR:
      return {
        error: action.youtubeDownloadResultInsert.error,
        query: state.query
      };
    case actions.youtubeDownloadResultInsert
      .YOUTUBE_DOWNLOAD_RESULT_INSERT_QUERY:
      return { query: action.youtubeDownloadResultInsert.query };
    case actions.youtubeDownloadResultInsert
      .YOUTUBE_DOWNLOAD_RESULT_INSERT_RESULT:
      return {
        query: state.query,
        result: action.youtubeDownloadResultInsert.result
      };
    default:
      return state;
  }
};

export { youtubeDownloadResultInsert };
