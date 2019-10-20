import { youtube_v3 } from "googleapis";

import { IStateYoutubeSearchListQuery } from "./iStateYoutubeSearchListQuery";

export interface IStateYoutubeSearchList {
  error?: Error;
  query?: IStateYoutubeSearchListQuery;
  result?: youtube_v3.Schema$SearchListResponse;
}
