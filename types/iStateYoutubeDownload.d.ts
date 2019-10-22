import { IStateYoutubeDownloadQuery } from "./iStateYoutubeDownloadQuery";
import { IVideoInfo } from "./lib/iVideoInfo";

export interface IStateYoutubeDownload {
  error?: any;
  query?: IStateYoutubeDownloadQuery;
  result?: IVideoInfo;
}
