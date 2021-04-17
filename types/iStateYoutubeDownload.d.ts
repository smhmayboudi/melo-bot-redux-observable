import { IStateYoutubeDownloadQuery } from "./iStateYoutubeDownloadQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "./iStateYoutubeDownloadResultInsertQuery";

export interface IStateYoutubeDownload {
  error?: any;
  query?: IStateYoutubeDownloadQuery;
  result?: IStateYoutubeDownloadResultInsertQuery;
}
