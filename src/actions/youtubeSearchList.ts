import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";

const initalState: IStateYoutubeSearchList = {};

const YOUTUBE_SEARCH_LIST_ERROR: string = "YOUTUBE_SEARCH_LIST_ERROR";
const YOUTUBE_SEARCH_LIST_QUERY: string = "YOUTUBE_SEARCH_LIST_QUERY";
const YOUTUBE_SEARCH_LIST_RESULT: string = "YOUTUBE_SEARCH_LIST_RESULT";

const error:
  (youtubeSearchList: IStateYoutubeSearchList) => IActionYoutubeSearchList =
  (youtubeSearchList: IStateYoutubeSearchList): IActionYoutubeSearchList =>
    ({
      type: YOUTUBE_SEARCH_LIST_ERROR,
      youtubeSearchList: {
        error: youtubeSearchList.error,
      },
    })
  ;
const query:
  (youtubeSearchList: IStateYoutubeSearchList) => IActionYoutubeSearchList =
  (youtubeSearchList: IStateYoutubeSearchList): IActionYoutubeSearchList =>
    ({
      type: YOUTUBE_SEARCH_LIST_QUERY,
      youtubeSearchList: {
        query: youtubeSearchList.query,
      },
    })
  ;
const result:
  (youtubeSearchList: IStateYoutubeSearchList) => IActionYoutubeSearchList =
  (youtubeSearchList: IStateYoutubeSearchList): IActionYoutubeSearchList =>
    ({
      type: YOUTUBE_SEARCH_LIST_RESULT,
      youtubeSearchList: {
        result: youtubeSearchList.result,
      },
    })
  ;

export {
  initalState,
  YOUTUBE_SEARCH_LIST_ERROR,
  YOUTUBE_SEARCH_LIST_QUERY,
  YOUTUBE_SEARCH_LIST_RESULT,
  error,
  query,
  result,
};
