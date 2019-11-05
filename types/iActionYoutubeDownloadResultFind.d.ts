import { Action } from "redux";

import { IStateYoutubeDownloadResultFind } from "./iStateYoutubeDownloadResultFind";

export interface IActionYoutubeDownloadResultFind extends Action<string> {
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind;
}
