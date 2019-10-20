import { youtube_v3 } from "googleapis";

import { IStateYoutubeVideoListQuery } from "./iStateYoutubeVideoListQuery";

export interface IStateYoutubeVideoList {
  error?: Error;
  query?: IStateYoutubeVideoListQuery;
  result?: youtube_v3.Schema$VideoListResponse;
}
