import { IVideoInfo } from "./lib/iVideoInfo";

export interface IStateYoutubeDownload {
  error?: Error;
  query?: string;
  result?: IVideoInfo;
}
