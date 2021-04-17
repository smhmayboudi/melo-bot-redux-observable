import { youtube_v3 } from "googleapis";

export interface IStateYoutubeVideoListQuery
  extends youtube_v3.Params$Resource$Videos$List {
  key: string;
}
