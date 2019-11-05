import { IStateYoutubeDownloadResultFindQuery } from "./iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "./iStateYoutubeDownloadResultInsertQuery";

export interface IStateYoutubeDownloadResultFind {
  error?: any;
  query?: IStateYoutubeDownloadResultFindQuery;
  result?: IStateYoutubeDownloadResultInsertQuery;
}
