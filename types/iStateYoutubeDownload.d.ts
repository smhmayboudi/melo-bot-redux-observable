import { IStateYoutubeDownloadQuery } from "./iStateYoutubeDownloadQuery";
import { IVideoInfo } from "./libs/iVideoInfo";

export interface IStateYoutubeDownload {
  error?: any;
  query?: IStateYoutubeDownloadQuery;
  result?: IVideoInfo;
}
