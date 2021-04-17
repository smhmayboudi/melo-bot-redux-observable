import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import * as actions from "../actions";

const youtubeSearchList: (
  state: IStateYoutubeSearchList | undefined,
  action: IActionYoutubeSearchList
) => IStateYoutubeSearchList = (
  state: IStateYoutubeSearchList | undefined = actions.youtubeSearchList
    .initialState,
  action: IActionYoutubeSearchList
): IStateYoutubeSearchList => {
  switch (action.type) {
    case actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR:
      return { ...state, error: action.youtubeSearchList.error };
    case actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_QUERY:
      return { ...state, query: action.youtubeSearchList.query };
    case actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_RESULT:
      return { ...state, result: action.youtubeSearchList.result };
    default:
      return state;
  }
};

export { youtubeSearchList };
