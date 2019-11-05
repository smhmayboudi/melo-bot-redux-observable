import { Action } from "redux";

import { IStateYoutubeDownloadResultInsert } from "./iStateYoutubeDownloadResultInsert";

export interface IActionYoutubeDownloadResultInsert extends Action<string> {
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert;
}
