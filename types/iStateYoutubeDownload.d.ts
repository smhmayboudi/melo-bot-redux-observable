import { IVideoInfo } from "./lib/iVideoInfo";

export interface IStateYoutubeDownload {
  error?: any;
  query?: string;
  result?: IVideoInfo;
}