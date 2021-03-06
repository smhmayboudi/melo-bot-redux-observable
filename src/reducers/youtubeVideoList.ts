import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";
import * as actions from "../actions";

const youtubeVideoList: (
  state: IStateYoutubeVideoList | undefined,
  action: IActionYoutubeVideoList
) => IStateYoutubeVideoList = (
  state: IStateYoutubeVideoList | undefined = actions.youtubeVideoList
    .initialState,
  action: IActionYoutubeVideoList
): IStateYoutubeVideoList => {
  switch (action.type) {
    case actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR:
      return { ...state, error: action.youtubeVideoList.error };
    case actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_QUERY:
      return { ...state, query: action.youtubeVideoList.query };
    case actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_RESULT:
      return { ...state, result: action.youtubeVideoList.result };
    default:
      return state;
  }
};

export { youtubeVideoList };
