import { Action } from "redux";
import { IStateYoutubeDownload } from "./iStateYoutubeDownload";

export interface IActionYoutubeDownload extends Action<string> {
  youtubeDownload: IStateYoutubeDownload;
}
