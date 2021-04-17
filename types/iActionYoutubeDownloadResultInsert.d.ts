import { IAction } from "./iAction";
import { IStateYoutubeDownloadResultInsert } from "./iStateYoutubeDownloadResultInsert";

export interface IActionYoutubeDownloadResultInsert extends IAction {
  youtubeDownloadResultInsert: IStateYoutubeDownloadResultInsert;
}
