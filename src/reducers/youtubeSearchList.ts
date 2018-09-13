import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import * as actions from "../actions";

const youtubeSearchList:
  (
    state: IStateYoutubeSearchList | undefined,
    action: IActionYoutubeSearchList,
  ) =>
    IStateYoutubeSearchList =
  (
    state: IStateYoutubeSearchList | undefined = actions.youtubeSearchList.initalState,
    action: IActionYoutubeSearchList,
  ):
    IStateYoutubeSearchList => {
    switch (action.type) {
      case actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR:
        return { error: action.youtubeSearchList.error, query: state.query };
      case actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_QUERY:
        return { query: action.youtubeSearchList.query };
      case actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_RESULT:
        return { query: state.query, result: action.youtubeSearchList.result };
      default:
        return state;
    }
  };

export { youtubeSearchList };
