import { IStateYoutubeDownloadResultFindQuery } from "./iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "./iStateYoutubeDownloadResultInsertQuery";

export interface IStateYoutubeDownload {
  error?: any;
  query?: IStateYoutubeDownloadResultFindQuery;
  result?: IStateYoutubeDownloadResultInsertQuery;
}
