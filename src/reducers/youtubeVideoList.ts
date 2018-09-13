import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";
import * as actions from "../actions";

const youtubeVideoList:
  (
    state: IStateYoutubeVideoList | undefined,
    action: IActionYoutubeVideoList,
  ) =>
    IStateYoutubeVideoList =
  (
    state: IStateYoutubeVideoList | undefined = actions.youtubeVideoList.initalState,
    action: IActionYoutubeVideoList,
  ):
    IStateYoutubeVideoList => {
    switch (action.type) {
      case actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR:
        return { error: action.youtubeVideoList.error, query: state.query };
      case actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_QUERY:
        return { query: action.youtubeVideoList.query };
      case actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_RESULT:
        return { query: state.query, result: action.youtubeVideoList.result };
      default:
        return state;
    }
  };

export { youtubeVideoList };
