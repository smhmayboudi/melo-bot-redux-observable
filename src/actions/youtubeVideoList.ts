import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";

const initialState: IStateYoutubeVideoList = {};

const YOUTUBE_VIDEO_LIST_ERROR: string = "YOUTUBE_VIDEO_LIST_ERROR";
const YOUTUBE_VIDEO_LIST_QUERY: string = "YOUTUBE_VIDEO_LIST_QUERY";
const YOUTUBE_VIDEO_LIST_RESULT: string = "YOUTUBE_VIDEO_LIST_RESULT";

const error: (
  youtubeVideoList: IStateYoutubeVideoList
) => IActionYoutubeVideoList = (
  youtubeVideoList: IStateYoutubeVideoList
): IActionYoutubeVideoList => ({
  type: YOUTUBE_VIDEO_LIST_ERROR,
  youtubeVideoList: {
    error: youtubeVideoList.error
  }
});
const query: (
  youtubeVideoList: IStateYoutubeVideoList
) => IActionYoutubeVideoList = (
  youtubeVideoList: IStateYoutubeVideoList
): IActionYoutubeVideoList => ({
  type: YOUTUBE_VIDEO_LIST_QUERY,
  youtubeVideoList: {
    query: youtubeVideoList.query
  }
});
const result: (
  youtubeVideoList: IStateYoutubeVideoList
) => IActionYoutubeVideoList = (
  youtubeVideoList: IStateYoutubeVideoList
): IActionYoutubeVideoList => ({
  type: YOUTUBE_VIDEO_LIST_RESULT,
  youtubeVideoList: {
    result: youtubeVideoList.result
  }
});

export {
  initialState,
  YOUTUBE_VIDEO_LIST_ERROR,
  YOUTUBE_VIDEO_LIST_QUERY,
  YOUTUBE_VIDEO_LIST_RESULT,
  error,
  query,
  result
};
