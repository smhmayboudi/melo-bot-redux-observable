import { youtube_v3 } from "googleapis";

export interface IStateYoutubeSearchListQuery
  extends youtube_v3.Params$Resource$Search$List {
  key: string;
}
